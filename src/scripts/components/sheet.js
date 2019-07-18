import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
class GridSheet extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        
        this.sheetName=this.options.sheetName;
        this.sheetNumber=this.options.sheetNumber;
        this.addSheetDOM();
    }

    // createColumns()
    // {
    //     this.columns.push(new GridSheetColumn(null,Object.assign({}, this.options, {parent:this.element,isGutter:true})));
    //     Array(this.options.initialColumns).forEach((e)=>{
    //         this.columns.push(new GridSheetColumn(null,Object.assign({}, this.options, {parent:this.element,isGutter:false})));
    //     }) ;   
    // }

    addSheetDOM()
    {
        this.logger.info('adding sheet to DOM');
        this.element=document.createElement('div');
        this.element.style.width=this.options.parent.style.width;
        this.element.style.height=this.options.parent.style.height;
        this.element.setAttribute('class','sheet');
        this.options.parent.appendChild(this.element);
    }
}

export default GridSheet;