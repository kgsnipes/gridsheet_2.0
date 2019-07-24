
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
            return this.getColumnName(chars.charAt((colNum/chars.length)-2)+colName,chars.length);
          else
            return this.getColumnName(chars.charAt((colNum/chars.length)-1)+colName,r);
        }
      else{
        return colName+chars.charAt(colNum-1);
      }
    }
    
     static reverseString(str) {
        return str.split("").reverse().join("");
    }
    
}
export default GridSheetUtil;