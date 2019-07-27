import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetUtil from '../common/util';
import { ECONNABORTED } from 'constants';
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
         //this.logger.info('adding sheetbutton to DOM');
        this.element=document.createElement('div');
        //this.element.style.height=this.options.parent.element.style.height;
        
        this.element.classList.add("sheetbutton");
        if(this.options.isActive)
        {
            this.element.classList.add("active");
        }
        this.element.setAttribute('id','sheetbutton_'+this.sheetNumber);
        this.element.style.width=this.getSheetButtonWidth()+this.options.dimension.units;
        //this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
        this.sheetNameLabel=document.createElement('label');
        this.sheetNameLabel.innerText=this.sheetName;
        
        this.sheetActions=document.createElement('button');
        this.sheetActions.classList.add('sheetactions');
        this.sheetActions.innerText=':';
        this.element.appendChild(this.sheetActions);
        this.element.appendChild(this.sheetNameLabel);
    }

    setPositionForSheetActionButton()
    {
       
    }

    addEventListener()
    {
        let outerContainer=this.options.parent.options.parent.options.parent;
        this.element.addEventListener('click',(evt)=>{
            outerContainer.innerContainer.sheetContainer.sheets.forEach(sheet => {
                if(sheet.sheetNumber===this.sheetNumber){
                    sheet.show();  
                }
                else{
                    sheet.hide();
                    sheet.sheetButton.makeInActive();
                }
            });
             this.makeActive();
        });

        this.sheetNameLabel.addEventListener('dblclick',evt=>{
            this.sheetNameLabel.setAttribute('contenteditable','true');
        });
        this.sheetNameLabel.addEventListener('blur',evt=>{
            this.sheetNameLabel.setAttribute('contenteditable','false');
        });
        this.sheetNameLabel.addEventListener('keydown',evt=>{
            //console.log(evt.code);
            if(evt.code==='Enter')
                this.sheetNameLabel.setAttribute('contenteditable','false');
        });

        this.sheetNameLabel.addEventListener('keypress',evt=>{
            //console.log(evt.code);
            if(evt.code!='Enter')
            {
                this.adjustSheetButtonWidth(evt.target.innerText);
            }
            else if(evt.code==='Backspace')
            {
                this.adjustSheetButtonWidth(evt.target.innerText);
            }
                
        });
    }

    adjustSheetButtonWidth(str)
    {
        this.element.style.width=this.getSheetButtonWidthForString(str)+this.options.dimension.units;
        this.options.parent.adjustWidthForSheetButtonContainer();
    }

    makeActive()
    {
        this.element.classList.add('active');
    }
    makeInActive()
    {
        this.element.classList.remove('active');
    }

    getSheetButtonWidthForString(str)
    {
       return  (str.length+10)*5;
    }


    getSheetButtonWidth()
    {
       return  (this.sheetName.length+10)*5;
    }

}

export default GridSheetSheetButton;