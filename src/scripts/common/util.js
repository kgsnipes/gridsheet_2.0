
class GridSheetUtil
{
    static getColumnNameFromColumnNumber(columnNumber)
    {
       return this.getColumnName('',columnNumber);
    }

    static getColumnName(colName,colNum)
    {
      let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(colNum>chars.length)
        {
          let r=colNum%chars.length;
          if(r===0)
            return this.getColumnName(colName+chars.charAt((colNum/chars.length)-2),chars.length);
          else
            return this.getColumnName(colName+chars.charAt((colNum/chars.length)-1),r);
        }
      else{
        return this.reverseString(chars.charAt(colNum-1)+colName);
      }
    }
    
     static reverseString(str) {
        return str.split("").reverse().join("");
    }
    
}
export default GridSheetUtil;