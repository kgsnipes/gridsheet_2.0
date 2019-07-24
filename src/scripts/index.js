import '../styles/index.scss';
import GridSheetLogger from './common/logger';
import GridSheetOptions from './common/options';
import GridSheetOuterContainer from './components/outercontainer';

class GridsheetApp
{
    constructor(element,options)
    {
        this.logger=new GridSheetLogger(this.constructor.name);
        this.logger.info('entered the gridsheet constructor');
        this.element=element;
        this.options=Object.assign({}, GridSheetOptions, options);
        this.initUI();
    }

    initUI()
    {
        this.renderSheetOuterContainer();
      
    }

    renderSheetOuterContainer()
    {
        this.outerContainer=new GridSheetOuterContainer(this.element,Object.assign({}, this.options, {parent:this.outerContainer}));  
        this.outerContainer.render();   
    }

    



}

let gridSheet=new GridsheetApp(document.getElementById("gridsheet"),{});
