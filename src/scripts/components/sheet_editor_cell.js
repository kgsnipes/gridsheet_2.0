import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetUtil from '../common/util';

class GridSheetEditorCell extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.options=options;
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.element=document.createElement('textarea');
        this.element.classList.add('editorcell');
        this.element.classList.add('hide');
        this.element.style.width='0px';
        this.element.style.height='0px';
        this.options.parent.element.appendChild(this.element);   
        this.addEventListener();
    }

    showAtCell(cell)
    {
        this.hideFromCell();
        this.currentCell=cell;
        this.element=this.options.parent.element.removeChild(this.element);
        this.currentCell.element.appendChild(this.element);
        this.element.style.width=(GridSheetUtil.getPxFromStyle(this.currentCell.options.parent.element.style.width)*0.90)+this.options.dimension.units;
        this.element.style.height=this.currentCell.element.style.height;
        this.element.classList.remove('hide');
        this.element.value=this.getValueFromParentCell();
        this.element.focus();
    }

    hideFromCell()
    {
        if(this.currentCell && this.element.parentElement==this.currentCell.element)
        {
            this.element.classList.add('hide');
            this.element=this.currentCell.element.removeChild(this.element);
            this.options.parent.element.appendChild(this.element);
            this.element.style.width='0px';
            this.element.style.height='0px';
            this.setCellContent();
            this.clearContentFromEditorCell();
            this.currentCell.showChildren();
        }
    }

    setCellContent()
    {
        this.currentCell.cellContentElement.textContent=this.getStringValueForCell();
        this.currentCell.cellContent=this.getValueForCell();
    }

    getStringValueForCell()
    {
        return this.element.value;
    }

    getValueForCell()
    {
        return this.element.value;
    }

    clearContentFromEditorCell()
    {
        this.element.value='';
        
    }
    getValueFromParentCell()
    {
        if(this.currentCell)
        {
            return this.currentCell.cellContentElement.textContent;
        }
        return '';
    }

    addEventListener()
    {
        this.element.addEventListener('blur',evt=>{
            this.hideFromCell();
            
        });
    }

}

export default GridSheetEditorCell;