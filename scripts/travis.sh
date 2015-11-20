#!/bin/bash
set -ev
if [ "${TRAVIS_OS_NAME}" = "osx" ]; then
  echo "Running on OS X"
  brew update
else
  echo "Running on Linux"
  # We need this line to have g++4.8 available in apt
  sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test
  sudo apt-get update -qq
  sudo apt-get install -qq gcc-4.8 g++-4.8
  # We want to compile with g++ 4.8 when rather than the default g++
  sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 90
fi