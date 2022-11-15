/*startEl = {
    children: [child1, child2, ...] 
}
*/
var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];//por si hay varios elementos

  if (typeof startEl === "undefined") {
    startEl = document.body;//busca por todo el arbol
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  if (matchFunc(startEl)) {//si matchea
    resultSet.push(startEl);
  } 
  for (const child of startEl.children) {
    let newElement = traverseDomAndCollectElements(matchFunc, child);//recorre recursiva sobre el nodo hijo del dom
    resultSet = [...resultSet, ...newElement]; //al resulset se le agrega el new element
  }
  return resultSet;

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí

  //selector = "#nombre", ".nombre", "div.nombre", "div"
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.includes(".")) return "tag.class";//si tiene un punto 
  return "tag";
  
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

//selector = "nombre" ---> tag, class, id, tag.class
//element = {id: "nombre", classList: [nombre1, numbre2, ...], tagName: "DIV", }
var matchFunctionMaker = function(selector) {//se pasa como argumento el selector
  var selectorType = selectorTypeMatcher(selector);//aquí se guarda lo que retorna la funcion anterior
  var matchFunction;// se declara pero no se da valor, clousure, la variable valdra una funcion
  if (selectorType === "id") { //aqui se da el valor
    matchFunction = (element) => `#${element.id}` === selector;
  } else if (selectorType === "class") {
    matchFunction = (element) => element.classList.contains(selector.slice(1));//divide 
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [tagName, className] = selector.split(".")//se divide por el punto
      return (//debe verificar si son ambas cosas entonces hace recursividad en ambos casos
        matchFunctionMaker(tagName)(element) && matchFunctionMaker(`.${className}`)(element)
        //-------------------------
        //retorna una matchFunction
        //            matchFunction(element)
      )
    }
  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName === selector.toUpperCase();
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
