#!/bin/bash

export COMMIT_MESSAGE="Automatic Deployment: `date`"
export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TESTDIR="`pwd`/../../tests"
export JSLINT=$TESTDIR/static-analyzer/node_modules/jslint
export DIR=`pwd`
export CUR_SCRIPT=`basename $0`

echo "`date` ********************************* New log" > "$PWD/$CUR_SCRIPT"
export PARENT_COMMAND=$(ps $PPID | tail -n 1 | awk "{print \$5}")
echo "`date` Executed by $PARENT_COMMAND" | tee -a "$PWD/$CUR_SCRIPT"

echo
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` - Preflight checks" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo
echo "`date` make sure jslint is installed" | tee -a "$DIR/$CUR_SCRIPT"
if [[ ! -d $JSLINT ]]; then
	#install jslint locally
	echo "`date` Please install jslint first." | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date`   jslint is expected to be installed in $TESTDIR/static-analyzer/." | tee -a "$DIR/$CUR_SCRIPT"
	exit 1
fi

echo | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` - STAGE0, development" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo | tee -a "$DIR/$CUR_SCRIPT"

git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
git pull | tee -a "$DIR/$CUR_SCRIPT"

echo | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` - STAGE1, static-analyzer" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo | tee -a "$DIR/$CUR_SCRIPT"

git checkout $STAGE1 | tee -a "$DIR/$CUR_SCRIPT"

cd $TESTDIR/static-analyzer
./run_lint.sh > static-analyzer-results.log

if [ -f $TESTDIR/static-analyzer/error_log.txt ]; then
	echo "`date` !!!!! ERRORS: No commit for branch 'test' was performed. !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date` >>>>> Resolve the conflicts before continuing." | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
	exit 1
fi

git merge --no-edit $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
git commit -am "Merging from $STAGE0 to $STAGE1: `date`" | tee -a "$DIR/$CUR_SCRIPT"
git push origin $STAGE1 | tee -a "$DIR/$CUR_SCRIPT"

echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` - STAGE2, unit-tests" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"

git checkout $STAGE2 | tee -a "$DIR/$CUR_SCRIPT"

cd "$TESTDIR/../server"
export NODE_ENV=test
node bin/www.js >/dev/null 2>&1 &
export node_PID=$!
sleep 4
echo "`date` node started with process id = $node_PID" | tee -a $CUR_SCRIPT


# Change directory to unit-tests
cd "$TESTDIR/unit-tests"

rm -fr unit-tests-results.log

# Run the unit test
mocha > unit-tests-results.log

# kill nodemon
kill -9 $node_PID

# count fail occurences
export TEST_FAILURUES=`grep -ci 'fail' unit-tests-results.log`

if [ -z "$TEST_FAILURUES" ]; then
    echo "`date` !!!!! ERRORS ERRORS ERRORS !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date` >>>>>  Could not execute the tests. Variable TEST_FAILURUES=$TEST_FAILURUES" | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
    exit 1
fi

if [ $TEST_FAILURUES -ne 0 ]; then
    echo"`date` !!!!! ERRORS ERRORS ERRORS !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date`   Did not pass the unit-tests" | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
	exit 1
fi

if [ -f ./test/static-analyzer/error_log.txt ]; then
	echo "!!!!! ERRORS: No commit for branch 'test' was performed. !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "!!!!! >>>>> Resolve the conflicts before continuing.           !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
	exit 1
fi

git merge --no-edit $STAGE1 | tee -a "$DIR/$CUR_SCRIPT"
git commit -am "Merging from $STAGE2 to $STAGE2: `date`" | tee -a "$DIR/$CUR_SCRIPT"
git push origin $STAGE2 | tee -a "$DIR/$CUR_SCRIPT"

echo | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` - STAGE3, end to end" | tee -a "$DIR/$CUR_SCRIPT"
echo "`date` -------------------------------------------------------------------------------" | tee -a "$DIR/$CUR_SCRIPT"
echo | tee -a "$DIR/$CUR_SCRIPT"

git checkout $STAGE3 | tee -a "$DIR/$CUR_SCRIPT"

# start up node
cd "$TESTDIR/../server"
export NODE_ENV=acceptance
node bin/www.js >/dev/null 2>&1 &
export node_PID=$!
sleep 4
echo "`date` node started with process id = $node_PID" | tee -a $CUR_SCRIPT

# start up selenium-stand-alone
selenium-standalone start --version=2.43.1 >/dev/null 2>&1 &
sleep 4
export selenium_PID=$!

# run e2e tests
cd "$TESTDIR/e2e"
echo "`date` Current directory = `pwd`. It should be e2e" | tee -a $CUR_SCRIPT
protractor conf.js > end-to-end-results.log

kill -9 $node_PID
kill -9 $selenium_PID


# count fail occurences
export TEST_FAILURUES=`grep -ci 'fail' end-to-end-results.log`

if [ -z "$TEST_FAILURUES" ]; then
    echo "`date` !!!!! ERRORS ERRORS ERRORS !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date`   Could not execute the tests. Variable TEST_FAILURUES=$TEST_FAILURUES" | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
    exit 1
fi

if [ $TEST_FAILURUES -ne 0 ]; then
    echo"`date` !!!!! ERRORS ERRORS ERRORS !!!!!" | tee -a "$DIR/$CUR_SCRIPT"
	echo "`date`   Did not pass the end-to-end tests." | tee -a "$DIR/$CUR_SCRIPT"
	git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
	exit 1
fi

git merge --no-edit $STAGE2 | tee -a "$DIR/$CUR_SCRIPT"
git commit -am "Merging from $STAGE2 to $STAGE3: `date`" | tee -a "$DIR/$CUR_SCRIPT"
git push origin $STAGE3 | tee -a "$DIR/$CUR_SCRIPT"



# Reset
echo "`date` Checking out $STAGE0" | tee -a "$DIR/$CUR_SCRIPT"
git checkout $STAGE0 | tee -a "$DIR/$CUR_SCRIPT"
