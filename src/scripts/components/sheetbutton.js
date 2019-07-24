import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetSheetButton extends GridSheetComponent
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
        this.addSheetButtonDOM();
        this.addEventListener();
    }

    addSheetButtonDOM()
    {
        this.logger.info('adding sheetbutton to DOM');
        this.element=document.createElement('div');
        //this.element.style.height=this.options.parent.element.style.height;
        
        this.element.classList.add("sheetbutton");
        this.element.setAttribute('id','sheetbutton_'+this.sheetNumber);
        this.element.style.width=this.getSheetButtonWidth()+this.options.dimension.units;
        this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
    }

    addEventListener()
    {
        this.element.addEventListener('click',(evt)=>{
            let outerContainer=this.element.parentNode.parentNode.parentNode;
            outerContainer.querySelectorAll('div.innercontainer>div.sheetcontainer>div.sheet').forEach(ele=>{
                ele.classList.add('hide');
            });
            outerContainer.querySelector('div.innercontainer>div.sheetcontainer>div#sheet_'+this.sheetNumber).classList.remove('hide');
        });

    }

    getSheetButtonWidth()
    {
        (this.sheetName.length+5)*5;
    }

}

export default GridSheetSheetButton;