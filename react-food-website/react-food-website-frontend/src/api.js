// APIサーバにGETリクエストする，共通の処理
async function request(path, options = {}) {
    const url = `${process.env.REACT_APP_API_ORIGIN}${path}`; // プレースホルダをテンプレートリテラルに含めた記法；C言語のprintfみたいなやつ
    const response = await fetch(url, options);
    return response.json();
}

// 1. /restaurantsにGETリクエストを行う関数
export async function getRestaurants(arg = {}){
    const params = new URLSearchParams(arg);                // URLSearchParams()について，最下部に記述       
    return request(`/restaurants?${params.toString()}`);    // requestの第1引数はpathだから，レストラン一覧にあたるURLにリクエストを行う 
}

// 2. /restaurants/:restaurantId にGETリクエストを行う関数
export async function getRestaurant(restaurantId){
    return request(`/restaurants/${restaurantId}`);
}

// 3. /restaurants/:restaurantId/reviews にGETリクエストを行う関数
export async function getRestaurantReviews(restaurantId, arg = {}){
    const params = new URLSearchParams(arg);
    return request(`/restaurants/${restaurantId}/reviews?${params.toString()}`);
}

// ===== URLSearchParamsについて =====
// URLSearchParamsは，jsonで与えられたURLのパラメータを，クエリ文字列に変換してくれる
/* Example
    const data = {
        param1: "value1",
        param2: "value2"
    };
    const params = new URLSearchParams(data);
    console.log(params);
    出力はオブジェクト形式で，「URLSearchParams { 'param1' => 'value1', 'param2' => 'value2' }」
    
    console.log(params.toString());
    出力は文字列形式で，「param1=value1&param2=value2」

    よって，テンプレートリテラルと組み合わせることで，任意のデータをもってこれる
*/