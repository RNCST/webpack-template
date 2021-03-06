//import
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

//export
module.exports = {
  //parcel index.html==> webpack은 js를 진입점으로 사용한다.
  //파일을 읽는 진입점 설정
  entry: './js/main.js',
  //결과를(번들)을 반환하는 설정
  output: {
    // nodejs에서 요구하는 절대경로를 요구한다.
    path: path.resolve(__dirname, 'dist'), // 이 줄이 없어도 default로 dist폴더를만들어준다.
    // __dirname 과 dist를 합쳐준다.
    // __dirname 현재 파일이 있는 그 경로 
    filename: 'main.js', // 이줄이 없어도 defualt로 main.js로 만들어준다.
    // ==> ./public/main.js
    clean: true
    // build 이후 변경전 내용들을 지움
  
  },

  module:{
    rules:[
      {
        test: /\.s?css$/,
        // .css확장자로 끝나는 파일을 찾아서 test라는 속성으로 매칭해준다.
        use: [
          'style-loader',
          // 실제로 html의 style태그부분에 해석된 부분을 삽입해준다.
          // style-loader가 먼저 나와야한다.
          'css-loader',
          'postcss-loader',
          // js에서 css를 가져오고 css를 해석할 수 있게 한다.
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
          //webpack이 babel을 읽기위한 패키지
        ]
      }
    ]
  },
  // 번들링후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static'}
        // static 폴더안의 내용들이 copy되어 dist로 들어갈수있게만듬.
        // 정적인 내용들.
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }
}