module.exports = class Dictionary{
    keys=[];
    values=[];
    //
    addItem(key,value){
        if (key && value) {
            if(!this.isKeyExists(key)){
                this.keys.push(key);
                this.values.push(value);    
            }
        }
        else throw Error('key and value are mandatory');
    }
    //
    removeItem(key){
        let keyIndex = this.keys.indexOf(key);
        if(keyIndex>-1) {
            this.keys.splice(keyIndex,1);
            this.values.splice(keyIndex,1);
        }
        else throw Error(`key ${key} not found`);
    }
    //
    getItemByKey(key){
        let keyIndex = this.keys.indexOf(key);
        return this.getItem(keyIndex);
    }
    //
    getItemByValue(value){
        let valueIndex = this.values.indexOf(value);
        return this.getItem(valueIndex);
    }
    //
    getItem(index){
        let item = {key:this.keys[index],value:this.values[index]};
        if(item.key) return item;
        return undefined;        
    }
    //
    isKeyExists(key){
        return this.getItemByKey(key)?true:false;
    }
    //
    getItemsCount(){
        return this.keys.length;
    }
}