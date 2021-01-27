import cli.app


@cli.app.CommandLineApp()
def getFileName(app):
    print(app.params.file)


if __name__ == "__main__":
    getFileName.add_param("file", help="select file path", default=1, type=str)
    getFileName.run()
