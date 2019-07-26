import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetSheetScrollPanel extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.addSheetButtonScrollPanelDOM();
        this.addEventListener();
    }

    addSheetButtonScrollPanelDOM()
    {
        this.element=document.createElement('div');
        this.element.classList.add("sheetbuttonscrollpanel");
        this.element.setAttribute('id','sheetbuttonscrollpanel');
        this.options.parent.element.appendChild(this.element);
        
        this.rightScrollButton=document.createElement('button');
        this.leftScrollButton=document.createElement('button');
        this.rightScrollButton.classList.add("sheetbuttonscrollpanel_button");
        this.leftScrollButton.classList.add("sheetbuttonscrollpanel_button");
        this.rightScrollButton.innerHTML='>';
        this.leftScrollButton.innerHTML='<';
        this.element.appendChild(this.leftScrollButton);
        this.element.appendChild(this.rightScrollButton);
    }

    addEventListener()
    {
        this.leftScrollButton.addEventListener('click',evt=>{
            this.scrollTheButtonsContainerToLeft();
        });
        this.rightScrollButton.addEventListener('click',evt=>{
            this.scrollTheButtonsContainerToRight();
        });
    }
    
    scrollTheButtonsContainerToLeft()
    {
        this.options.parent.sheetButtonContainer.scrollSheetContainerToLeft(100);
    }

    scrollTheButtonsContainerToRight()
    {
        this.options.parent.sheetButtonContainer.scrollSheetContainerToLeft(-100);
    }

    
}

export default GridSheetSheetScrollPanel;