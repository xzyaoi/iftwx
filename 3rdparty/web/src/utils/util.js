/* eslint-disable */
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
    return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
        // put the copy into cache at first
        // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
    return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`)
}

function numOf(text){
    var l = text.length;
    var blen = 0;
    for(var i=0; i<l; i++) {
    if ((text.charCodeAt(i) & 0xff00) != 0) {
        blen += 1.3;
    }
        blen ++;
    }
    return blen
}

export function calcTextHeight(text,numsPerLine,lineHeight){
    return parseInt(numOf(text)/numsPerLine)*lineHeight+lineHeight
}

class Attender{
    constructor(extra,fontwidth,parentWidth){
        this.line = 1
        this.length = 0
        this.extra = extra
        this.fontwidth = fontwidth
        this.parentWidth = parentWidth
        this.empty = true
    }
    addMember(memberName){
        this.empty = false
        let item = numOf(memberName)*this.fontwidth+this.extra
        this.length+=item
        if(this.length >= this.parentWidth){
            this.length = item
            this.line++
        }
    }
    getLine(){ 
        if(this.empty) return 0
        else return this.line
    }
}

export function calcAttenderHeight(textArr,extra,lineHeight,fontwidth,parentWidth){
     let attender = new Attender(extra,fontwidth,parentWidth)
     for(let item of textArr){
         attender.addMember(item)
     }
    return attender.getLine()*lineHeight
}

export function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0, len = obj.length; i < len; ++i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}