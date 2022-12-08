module.exports = {
    "testEnvironment": "jsdom",
    modulePaths: ['/shared/vendor/modules'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ['node_modules', 'bower_components', 'shared'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        'battleship-project/__mocks__/fileMock.js',
      '\\.(css|less)$': 'battleship-project1/__mocks__/styleMock.js',
      '^config$': 'battleship-project1/app-config.js',
    }
  };