import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetSheetButton extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
        this.sheet=options.sheet;
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
        if(this.options.isActive)
        {
            this.element.classList.add("active");
        }
        this.element.setAttribute('id','sheetbutton_'+this.sheetNumber);
        this.element.style.width=this.getSheetButtonWidth()+this.options.dimension.units;
        this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
    }

    addEventListener()
    {
        let outerContainer=this.options.parent.options.parent.options.parent;
        this.element.addEventListener('click',(evt)=>{
            outerContainer.innerContainer.sheetContainer.sheets.forEach(sheet => {
                if(sheet.sheetNumber===this.sheetNumber){
                    sheet.showSheet();  
                }
                else{
                    sheet.hideSheet();
                    sheet.sheetButton.makeInActive();
                }
            });
             this.makeActive();
        });
    }

    makeActive()
    {
        this.element.classList.add('active');
    }
    makeInActive()
    {
        this.element.classList.remove('active');
    }

    getSheetButtonWidth()
    {
        (this.sheetName.length+5)*5;
    }

}

export default GridSheetSheetButton;