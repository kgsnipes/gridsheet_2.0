import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetUtil from '../common/util';
class GridSheetRowResizerHighlighter extends GridSheetComponent
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
        this.isVisibleFlag=false;
        this.rowHighlighterLine=document.createElement('div');
        this.rowHighlighterLine.classList.add('rowhighlighterline');
        this.rowHighlighterLine.classList.add('hide');
        this.rowHighlighterLine.style.width=this.options.parent.options.parent.element.style.width;
        let sheetElement=this.options.parent.element;
        sheetElement.appendChild(this.rowHighlighterLine);
        
        
    }

    show()
    {
        this.rowHighlighterLine.classList.remove('hide');
        this.isVisibleFlag=true;
    }
    hide()
    {
        this.rowHighlighterLine.classList.add('hide');
        let sheet=this.options.parent;
        this.setPosition(sheet.getTop()+sheet.getHeight());
        this.isVisibleFlag=false;
    }
    isVisible()
    {
        return this.isVisibleFlag;
    }

    setPosition(y)
    {
        this.rowHighlighterLine.style.top=y+this.options.dimension.units;
    }
 

}

export default GridSheetRowResizerHighlighter;