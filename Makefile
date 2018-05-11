all: build exec

clean:
	@./shell/clean.sh

build:
	@go build .

exec:
	@./CapstoneProject

git:
	@git add .
	@git commit -m "test"
	@git push