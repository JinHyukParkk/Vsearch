#!/bin/sh

set -e

echo "######APT Update..."
sudo apt-get update

echo "1.Setting Software"
echo "######Downloading GIT..."
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get dist-upgrade
sudo apt-get install git-core

echo "######Downloading Sox..."
yes n | sudo apt install sox

echo "######Downloading ffmpeg..."
yes n | sudo apt-get install ffmpeg

echo "2.Install Programming Language"
echo "######Downloading Java..."
yes n | sudo apt-get install default-jdk
yes n | sudo apt-get install default-jre
java -version

echo "######Downloading Golang..."
yes n | sudo apt-get install golang

VERSION="1.9.3"

DFILE="go$VERSION.linux-amd64.tar.gz"

echo "Downloading $DFILE ..."
wget https://storage.googleapis.com/golang/$DFILE -O /tmp/go.tar.gz

if [ $? -ne 0 ]; then
    echo "Download failed! Exiting."
    exit 1
fi

echo "Extracting File..."
tar -C "$HOME" -xzf /tmp/go.tar.gz
mv "$HOME/go" "$HOME/.go"
touch "$HOME/.profile"
{
    echo '# GoLang'
    echo 'export GOROOT=$HOME/.go'
    echo 'export PATH=$PATH:$GOROOT/bin'
    echo 'export GOPATH=$HOME/go'
    echo 'export PATH=$PATH:$GOPATH/bin'
} >> "$HOME/.profile"

mkdir -p $HOME/go/{src,pkg,bin}
rm -f /tmp/go.tar.gz

echo "######Downloading Python3-pip"
yes n | sudo apt-get install python3-pip
echo "######Downloading Cloud-SDK..."
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install google-cloud-sdk






