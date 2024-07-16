import React from 'react';

let changeCounter = 0;

// Definición del POJO con getters y setters
let myPojo = {
  _isShow: false,
  _HeadText: '',
  _content: (<></>),

  get isShow() {
    return this._isShow;
  },
  set setIsShow(value) {
    this._isShow = value;
    changeCounter++;
  },

  get HeadText() {
    return this._HeadText;
  },
  set setHeadText(value) {
    this._HeadText = value;
    changeCounter++;
  },

  get content() {
    return this._content;
  },
  set setContent(value) {
    this._content = value;
    changeCounter++;
  },

  setNotif(newHeadText = '', newContent = (<></>)) {
    if (newHeadText != '' && newContent != (<></>)) { 
      this._isShow = true;
      this._HeadText = newHeadText;
      this._content = newContent;
    //   console.log("True: ", this);
    } else {
      this._isShow = false;
      this._HeadText = newHeadText;
      this._content = newContent;
    //   console.log("false: ", this);
    }
    changeCounter++;
  }
};

export { myPojo, changeCounter };
