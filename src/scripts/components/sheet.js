import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetSheetButton from './sheetbutton';
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
        this.addSheetButtonToBottomBar();
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
        this.element.style.width=this.options.parent.element.style.width;
        this.element.style.height=this.options.parent.element.style.height;
        this.element.classList.add("sheet");
       
        this.element.setAttribute('id','sheet_'+this.sheetNumber);
        this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
        if(!this.options.isVisible)
        {
            this.element.classList.add('hide');
        }
    }

    addSheetButtonToBottomBar()
    {
        let bottomBar=this.options.parent.options.parent.options.parent.bottomBar;
        bottomBar.sheetButtons.push(new GridSheetSheetButton(null,Object.assign({}, this.options, {parent:bottomBar,sheetName:this.sheetName,sheetNumber:this.sheetNumber})));
    }
}

export default GridSheet;