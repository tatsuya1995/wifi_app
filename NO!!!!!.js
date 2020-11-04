function initMap() {
let a = navigator.geolocation.getCurrentPosition(get_pos);
function get_pos(position) {
  let lat = position.coords.latitude;　// 緯度
  let lng = position.coords.longitude; // 経度
  let latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({　// 現在地の位置設定とアイコンのカスタマイズ
      position: latLng,
      map: map,
      icon: {
        url: 'Octocat.png',
        scaledSize: new google.maps.Size(40, 40)
      }
  });
  map.setCenter(latLng);　// 地図の中央に現在地を表示する

    $.ajax({
        type : "get",
        url　: "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=0b20ce768872c0b3fd3aa91b01c3d11e&wifi=1&latitude="+lat+"&longitude="+lng+"&range=4&category_l=RSFST20000,RSFST18000",
        dataType : 'json',
        success　: function(json){
        let num_shop = json.rest.length;
        for( let i=0; i < num_shop; i++){
            console.log(json.rest[i].url);
            var latLng = new google.maps.LatLng(json.rest[i].latitude, json.rest[i].longitude);
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            label: {
            text: String(i+1),
            color: "#fff",
            fontWeight: 'bold',
            fontSize: '14px'
            },
            url: json.rest[i].url,
            });
            google.maps.event.addListener(marker, 'click', (function(url){
            return function(){ location.href = url; };
            })(json.rest[i].url));
            $('<li class="each-shop"><i class="fas fa-map-marker fa-3x"></i><span class="icon">'+ String(i+1) + '</span><a href="' + json.rest[i].url + '"><img class="shop-img" src=' + json.rest[i].image_url.shop_image1 + '><span class="shop-content"><span class="shop-name">' + String(i+1) + " " + json.rest[i].name + '</span><span class="time">営業時間：' + json.rest[i].opentime + '<</span></span></a></li>').appendTo('#shop-list');
        }
        },
        error: function(json){
        console.log("error")
        }
    });
}
};






// // //Geolocation API に対応しているか確認
// // if( navigator.geolocation ) {
// //     alert("現在位置を取得できる端末です。");
// // } else {
// //     alert("現在位置を取得できない端末です。");
// // }

// function success(position) {
//      $('#button').click(
//         $.ajax({
//             url　: "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=0b20ce768872c0b3fd3aa91b01c3d11e&wifi=1&latitude="+lat+"&longitude="+lon+"&range=4&category_l=RSFST20000,RSFST18000",
//             dataType : "json",
//             type:"get",
//             dataType :'json',
//             //通信に成功した時
//             success : function(json) {
//                 let shop = json.rest.length;

//                 var lat = position.coords.latitude;
//                 var lon = position.coords.longitude;
//                 document.getElementById("lat").innerHTML = lat;
//                 document.getElementById("lon").innerHTML = lon;
//             },
//             error: function() {
//                 console.log("エラーが発生しました。")
//             }
//         })
//      )};







// // //地図を表示する関数
// // function initMap(lat ,lon) {
// //     //地図表示に関するオプション
// //     var opts = {
// //     center: new google.maps.LatLng(lat,lon),
// //     zoom: 17,
// //      mapTypeId: google.maps.MapTypeId.ROADMAP
// //     };
// //     var latLng = new google.maps.LatLng(lat,low);
// //     var marker = new google.maps.Marker({
// //         position: latLng,
// //         map:map,
// //         icon: {
// //             fillColor: "#FF0000",                //塗り潰し色
// //             fillOpacity: 0.8,                    //塗り潰し透過率
// //             path: google.maps.SymbolPath.CIRCLE, //円を指定
// //             scale: 16,                           //円のサイズ
// //             strokeColor: "#FF0000",              //枠の色
// //             strokeWeight: 1.0                    //枠の透過率
// //         },
// //         label: {
// //             text: 'A',                           //ラベル文字
// //             color: '#FFFFFF',                    //文字の色
// //             fontSize: '20px'                     //文字のサイズ
// //         }
// //     });
// //     //地図を表示させるインスタンスを生成
// //     var map = new google.maps.Map(document.getElementById("map"), opts);
// // }
// // // Map(mapDiv:Node,opts?:MapOptions) div要素の内部に地図を作成
// // // LatLng(lat,lng)  地図の初期中心位置（緯度経度の順）


// // //現在位置を取得してHTML・MAPにて表示
// // function success(position) {
// //     var lat = position.coords.latitude;
// //     var lon = position.coords.longitude;
// //     document.getElementById("lat").innerHTML = lat;
// //     document.getElementById("lon").innerHTML = lon;

// //    initMap(lat,lon);

// // }



// //現在位置の取得に失敗した場合
// function error (error) {
//     var errorMessage = {
//         0: "原因不明のエラーが発生しました。" ,
// 		1: "位置情報の取得が許可されませんでした。" ,
// 		2: "電波状況などで位置情報が取得できませんでした。" ,
// 		3: "位置情報の取得に時間がかかりタイムアウトしました。" ,
//     };
//     //エラーコードに合わせたエラー内容をアラート表示
//     alert(errorMessage[error.code]);
// }
// // 現在位置を取得する。成功した時と失敗した時の関数を実行する。
// navigator.geolocation.getCurrentPosition( success , error ) ;




