#!/usr/bin/env bash

echo "Setting up VersaTile development env "

server_dir="`pwd`/server"
tests_dir="`pwd`/tests"
e2e_tests_dir=$tests_dir/e2e
static_analizer_dir=$tests_dir/static-analyzer
unit_tests_dir=$tests_dir/unit-tests
deployment_dir=

while getopts ":d" opt ; do
  case $opt in
    d)
      echo "setup with deployment features"
      deployment_dir=./deployment
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "no options"
      ;;
  esac
done

echo "Installing dependencies from the app server"
cd $server_dir
npm install --silent
if [[ $? -ne 0 ]]; then
  echo "error running npm install at $server_dir"
fi

echo "Installing dependencies for unit-tests"
cd $unit_tests_dir
npm install --silent
if [[ $? -ne 0 ]]; then
  echo "error running npm install at $unit_tests_dir"
fi

echo "Installing dependencies for the static-analyzer"
cd $static_analizer_dir
npm install --silent
if [[ $? -ne 0 ]]; then
  echo "error running npm install at $static_analizer_dir"
fi

echo "Installing dependencies for the end-to-end test"
cd $e2e_tests_dir
npm install --silent
if [[ $? -ne 0 ]]; then
  echo "error running npm install at $e2e_tests_dir"
fi

echo "Checking with protractor is installed globally"
check_output=$(npm list --global true | grep protractor)
if [[ -z $check_output  ]]; then
  echo "--Installing protractor and selenium server "
  npm install -g protractor
  echo "--Updating webdriver-manager"
  webdriver-manager update
else
  echo "Protractor and selenium are already installed"
fi
