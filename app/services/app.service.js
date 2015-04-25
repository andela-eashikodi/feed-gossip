'use strict';

App.service('msgService', function() {
  var msgText; 

  var addText = function(feed){
    msgText = feed.title;
  };

  var getText = function(){
    return msgText;
  };

  // return {
  //   addText: addText,
  //   getText: getText
  // };

  // var addProduct = function(newObj) {
  //     productList.push(newObj);
  // }

  // var getProducts = function(){
  //     return productList;
  // }

  // return {
  //   addProduct: addProduct,
  //   getProducts: getProducts
  // };

});