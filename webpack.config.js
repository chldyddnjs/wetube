const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");
const OUPUT_DIR = path.join(___dirname,"static");

const config ={
    entry: ENTRY_FILE, //어디에서 왔는지 경로를 나타냄
    mode:MODE,
    module:{
        rules: [
            {
                test:/\.(scss)$/, //정규표현식  scss를 모두찾아 준다
                use: ExtractCSS.extract([
                {
                    loader: "css-loader"//호환되는 css가 불러와지면 그부분만 텍스트를 추출해서 어딘가로 보낸다
                },
                {
                    loader:"postcss-loader",//css 호환성 해결
                    options:{
                        plugin() {
                            return [autoprefixer({ browsers : " cover 99.5%" })];
                        }
                    }
                },
                {
                    loader:"sass-loader" //scss or sass를 찾았을 때는 css로 바꾸고 
                }
            ])
                     
                     
            }       
        ]
    },
    output: {
        path : OUPUT_DIR,
        filename : "[name].[format]"
    },  //경로를 어디에 넣을것인가를 의미
    plugins:[new ExtractCSS("style.css")]
};
module.exports =config;