import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetUtil from '../common/util';

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
        this.element.style.width=this.getSheetButtonWidthForString(this.sheetName)+this.options.dimension.units;

        this.options.parent.element.appendChild(this.element);
       
        //this.element.innerHTML=this.sheetName;
        this.sheetActions=document.createElement('button');
        this.sheetActions.classList.add('sheetactions');
        this.sheetActions.innerText=':';
        console.log('sheet action left'+this.getSheetButtonWidthForString(this.sheetName));
        this.sheetActions.style.left=(this.getSheetButtonWidthForString(this.sheetName)+20)+this.options.dimension.units;

        this.sheetNameLabel=document.createElement('label');
        this.sheetNameLabel.innerText=this.sheetName;
        
        this.sheetNameInput=document.createElement('input');
        this.sheetNameInput.setAttribute('type','text');
        this.sheetNameInput.classList.add('hide');
        this.sheetNameInput.style.width=(this.getSheetButtonWidthForString(this.sheetName))+this.options.dimension.units;
        this.sheetNameInput.value=this.sheetNameLabel.innerText;
        
       
       
        this.element.appendChild(this.sheetActions);
        this.element.appendChild(this.sheetNameLabel);
        this.element.appendChild(this.sheetNameInput);
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
            this.sheetNameInput.classList.remove('hide');
            this.sheetNameLabel.classList.add('hide');
            this.sheetNameInput.style.width=(this.getSheetButtonWidthForString(this.sheetName)-(this.sheetActions.getBoundingClientRect().width))+this.options.dimension.units;
            this.sheetNameInput.focus();
        });
        this.sheetNameInput.addEventListener('blur',evt=>{
            this.sheetNameInput.classList.add('hide');
            this.sheetNameLabel.classList.remove('hide');
            this.sheetNameLabel.innerText=this.sheetNameInput.value;
            this.sheetName=this.sheetNameInput.value;
            this.adjustSheetButtonWidth(evt.target.value);
        });
        this.sheetNameInput.addEventListener('keydown',evt=>{
            //console.log(evt.code);
            if(evt.code==='Enter')
            {
                this.sheetNameInput.classList.add('hide');
                this.sheetNameLabel.classList.remove('hide');
                this.sheetNameLabel.innerText=this.sheetNameInput.value;
                this.sheetName=this.sheetNameInput.value;
                this.adjustSheetButtonWidth(evt.target.value);
            }
                
        });

        // this.sheetNameInput.addEventListener('keypress',evt=>{
        //     //console.log(evt.code);
        //     if(evt.code!='Enter')
        //     {
        //         this.adjustSheetButtonWidth(evt.target.value);
        //     }
        //     else if(evt.code==='Backspace')
        //     {
        //         this.adjustSheetButtonWidth(evt.target.value);
        //     }
                
        // });
    }

    adjustSheetButtonWidth(str)
    {
        
        this.sheetNameLabel.style.width=this.getWidthForSheetNameLabel(str)+this.options.dimension.units;
        this.sheetNameInput.style.width=this.sheetNameLabel.style.width;
       // this.sheetActions.style.left=(this.getSheetButtonWidthForString(str)-(this.sheetActions.getBoundingClientRect().width))+this.options.dimension.units;
        this.sheetActions.style.left=(GridSheetUtil.getPxFromStyle(this.sheetNameLabel.style.width)-this.sheetActions.getBoundingClientRect().width)+this.options.dimension.units;
        this.element.style.width=this.sheetNameLabel.style.width;
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
        if(this.sheetActions)
        {
            return  GridSheetUtil.getTextDisplayWidth(str+Array(4).fill(' ').join(''),this)+(this.sheetActions.getBoundingClientRect().width);
        }
        else
        {
            return  GridSheetUtil.getTextDisplayWidth(str+Array(20).fill(' ').join(''),this);
        }
            
    }

    getWidthForSheetNameLabel(str)
    {
        return  GridSheetUtil.getTextDisplayWidth(str+Array(20).fill(' ').join(''),this);
    }


    // getSheetButtonWidth()
    // {
    //    return  (this.sheetName.length+10)*5;
    // }

}

export default GridSheetSheetButton;