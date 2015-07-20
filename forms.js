//DontSend ==> RO                                                                                                                    
OPTOPT='_OPT';
var NavJSON=false;//true;//false;  
window.onload = function() { 
   // Stop Back Button         
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
   window.onhashchange=function(){window.location.hash="no-back-button";}     
};
(function($){
FormsListId=[11130,26260]//['F0213_PROCESS_SYSMENU0','F0210_PROCESS_SCRUSRMENU0'];
CmpByJSON=['26260'];//CmpByJSON.indexOf(CmpId)>-1
$.widget("np.NpTooltip", $.ui.tooltip, {    
   _open: function( event, target, content ) {
      this._super( event, target, content );
      var events={npdisable: "close"};
      this._on( true, target, events );
      //when disable a delegated tooltip, its tooltip stay on top
      //but for remove that tooltip we must do this:
      // ===>  $(element).triggerHandler('npdisable');
   }     
}); 
//'۰'.charCodeAt(0)=1776
//'0'.charCodeAt(0)=48
//yy=$.data($('#ui-id-186nA')[0])['np-npgrid']
//yy._vm.TrOfTBody()[1].Td()[3].Html('<table border="10px"><tbody><tr><td>34534</td></tr></tbody></table>')
$.NPChangeNumToFarsi=function(s){
   try{
      s=s.toString();
   }
   catch(e){}
   var FirstLatinNum=48,
       FirstFarsiNum=1776,
       i,len=s.length;
   for(i=0;i<len;i++){
      var c=s.charCodeAt(i);
      if ((c>FirstLatinNum-1&&c<FirstLatinNum+10)){
         s=s.substr(0,i)+String.fromCharCode(c+FirstFarsiNum-FirstLatinNum)+s.substr(i+1);
      }
   }
   return(s); 
};
$.NPChangeNumToLatin=function(s){
   var FirstLatinNum=48,
       FirstFarsiNum=1776,
       i,len=s.length;
   for(i=0;i<len;i++){
      var c=s.charCodeAt(i);
      if ((c>FirstFarsiNum-1&&c<FirstFarsiNum+10)){
         s=s.substr(0,i)+String.fromCharCode(c+FirstLatinNum-FirstFarsiNum)+s.substr(i+1);
      }
   }
   return(s); 
};
$.NPChangeNumToUnicode=function(s){
   if (s===0) 
      return '۰';
   s=s&&s.toString();
   s=s.replace(/\d/g,function(m){
      return String.fromCharCode(m.charCodeAt(0)+1776-48);
      //return $.NPChangeNumToFarsi(m);
   });
   s=s.replace(/(?:style|width|height|border|colspan|rowspan|class|src|vw)\s*=\s*(?:(?:'[^']*')|(?:"[^"]*"))/ig,
   function(m,g1){
      //return String.fromCharCode(m.charCodeAt(0)-1776+48);
      return  $.NPChangeNumToLatin(m);
   });
   return(s);   
   /*var i,len=s.length;
   var Quot=false,DblQuot=false;
   for(i=0;i<len;i++){
      var c=s.charCodeAt(i),cc=s[i];
      (cc=='"')&&(DblQuot= !DblQuot);
      (cc=="'")&&(Quot= !Quot);
      if ((!Quot)&&(!DblQuot)&&(c>47&&c<58)){
         s=s.substr(0,i)+String.fromCharCode(c+1776-48)+s.substr(i+1);
         //s[i]=String.fromCharCode(c+1776-48);
      }
   }
   //while(s.indexOf(String.fromCharCode(48))>-1)
   //   s=s.replace(String.fromCharCode(48),'۰');
   return(s);*/ 
}; 
/*ko.bindingHandlers.CMP = {
   init: 
   function (element, valueAccessor, allBindingsAccessor, viewModel) {
      //allBindingsAccessor().npform.CreateComponent(valueAccessor())
      return { 'controlsDescendantBindings': true };
   }
}*/
ko.bindingHandlers.UniHtml = {
   init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        return { 'controlsDescendantBindings': true };
   },
   update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var value = ko.unwrap(valueAccessor());
      var Result={
         'Str':'',
         'flag':true
      };
      try{
         value=value&&$.NPChangeNumToUnicode(value);
      }
      catch(e){}
      var ML=allBindingsAccessor().NpMultiLine;
      if (ML&&ML=='0'){
         ko.utils.setHtml(element, '<nobr>'+value+'</nobr>');
      }
      else{
         var flag=viewModel.Index != undefined || !value;// viewModel.Index is not undefined for npgrid cells
         var id=$(element).attr('orgid');
         if (!flag&&viewModel._npform&&id&&viewModel._npform.W_.FrmFld[id]&&(viewModel._npform.W_.FrmFld[id].Valid['NoCheckHtml']=='1'))
            flag=true;
         if(flag){
            ko.utils.setHtml(element, value); 
         }
         else
         {
            Result = value ? $.StandardHtml(value) : Result;
            if(Result.flag){
               ko.utils.setHtml(element, value);
            }   
            else{
               var val = value;
               try{
                  val = $(value).text();
               }catch(e){
               }
               ko.utils.setTextContent(element, val);
            }
         }
              
      }
   }
};
//ko.exportSymbol('utils.setTextContent', ko.utils.Xa);//ko3.1
//ko.exportSymbol('utils.setTextContent', ko.utils.bb);//ko3.2
//ko.exportSymbol('utils.setTextContent', ko.utils.Ha);//ko3.3
ko.bindingHandlers.UniText = {
   init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        return { 'controlsDescendantBindings': true };
   },
   update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var value = ko.unwrap(valueAccessor());
      try{
         value=value&&$.NPChangeNumToUnicode(value);
      }
      catch(e){}
      try{
         //ko.utils.Xa(element, value);//ko3.1
         //ko.utils.bb(element, value);//ko3.2
         //ko.utils.Ha(element, value);//ko3.3
         ko.utils.setTextContent(element, value);//ko3.3
         var ML=allBindingsAccessor().NpMultiLine;
         if (ML&&ML=='0'){
            ko.utils.setHtml(element, '<nobr>'+$(element).html()+'</nobr>')
         }
      }
      catch(e){}
   }
};
ko.virtualElements.allowedBindings['UniText'] = true;
ko.bindingHandlers['FadeVisible'] = {
   'update': function (element, valueAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor());
      var isCurrentlyVisible = !(element.style.display == "none");
      if (typeof(value)=='undefined')
         $(element).hide();
      else if (value)
         $(element).show('blind',300,function(){
            //$(window).resize()
         });
      else
         $(element).hide('blind',300,function(){
            //$(window).resize()
         });
   }
};
})(jQuery);
//glob.js
(function($){
   $.NPComponentsHtml={};
   $.NPComponentsXml={};
   $.NPComponentsJsCode={};
   $.NPComponentsJsRun={};
   $.NPVars={};
   $.NPClearLocalStorage=function(){
      $.NPComponentsHtml={}
      $.NPComponentsXml={};
      $.NPComponentsJsCode={};
      $.NPComponentsJsRun={};
   }
   $.NPLocalStorage=function(CmpId,Type,Val){
      var UseLocalStorage=true;
      if ((Type=="HTML")||(Type=="XML")||(Type=="JS")){
         switch (Type){
            case "HTML":{
               if (Val) $.NPComponentsHtml[CmpId]=Val;
               return $.NPComponentsHtml[CmpId];
               break;
            }
            case "XML":{
               if (Val) $.NPComponentsXml[CmpId]=Val;
               return $.NPComponentsXml[CmpId];
               break;
            }
            case "JS":{
               if (Val) $.NPComponentsJsCode[CmpId]=Val;
               if (true){//(!Val){
                  //if (!$.NPComponentsJsRun[CmpId]){
                     Val=$.NPComponentsJsCode[CmpId];
                     $.globalEval(Val);
                     $.NPComponentsJsRun[CmpId]=true;
                  //}
               }
               return $.NPComponentsJsCode[CmpId];
               break;
            }
         }
         return;
      }
      if (UseLocalStorage){
         if (Val){
            localStorage[Type+'_'+CmpId]=Val;
         }
         return localStorage[Type+'_'+CmpId];
      } 
   }; 
   $.NPPkgs={ 
      npmenudrag:{ 
         js:[
            {f:'/js/npmenu.js'},
            {f:'/js/npmenudrag.js'}
         ],
         css:[]
      },
      npmenuTemp:{
         js:[{f:'/js/npmenuTemp.js'}],
         css:[]
      },
      npmenu:{
         js:[{f:'/js/npmenu.js'}],
         css:[]
      },
      npviewer:{
         js:[{f:'/js/npviewer.js'}],
         css:[]
      },
      autocomplete:{
         js:[{f:'/js/autocomplete.js'}],
         css:[]
      },
      calendar:{
         js:[
            {f:'/js/jqui.date.js'},
            {f:'/js/jqui.date.calender.js'},
            {f:'/js/jqui.date-fa.js'}
         ],
         css:[]
      },  
      cleditor:{ 
         js:[
            {f:'/pkg/cleditor/jquery.cleditor.js'}/*,
            {f:'/pkg/cleditor/jquery.cleditor.xhtml.js'}*/
         ],
         css:[{f:'/pkg/cleditor/jquery.cleditor.css'}]
      },
      dynatree:{
         js:[{f:'/pkg/dynatree/jquery.dynatree.js'}],
         css:[{f:'/pkg/dynatree/skin/ui.dynatree.css'}]
      },
      codemirror:{
         js:[
            {f:'/pkg/codemirror/lib/codemirror.js'},
            {f:'/pkg/codemirror/mode/xml/xml.js'},
            
            /* search */
            {f:'/pkg/codemirror/addon/dialog/dialog.js'},
            {f:'/pkg/codemirror/addon/search/searchcursor.js'},
            {f:'/pkg/codemirror/addon/search/search.js'},
            {f:'/pkg/codemirror/addon/scroll/annotatescrollbar.js'},
            {f:'/pkg/codemirror/addon/search/matchesonscrollbar.js'},
            /* fold */
            {f:'/pkg/codemirror/addon/fold/foldcode.js'},
            {f:'/pkg/codemirror/addon/fold/foldgutter.js'},
            {f:'/pkg/codemirror/addon/fold/brace-fold.js'},
            {f:'/pkg/codemirror/addon/fold/xml-fold.js'},
            {f:'/pkg/codemirror/addon/fold/markdown-fold.js'},
            {f:'/pkg/codemirror/addon/fold/comment-fold.js'},
            {f:'/pkg/codemirror/mode/markdown/markdown.js'},
            /*Autocomplete*/
            {f:'/pkg/codemirror/addon/hint/show-hint.js'},
            {f:'/pkg/codemirror/addon/hint/javascript-hint.js'},
            /* global*/
            {f:'/pkg/codemirror/mode/javascript/javascript.js'},
            {f:'/pkg/codemirror/mode/css/css.js'},
            {f:'/pkg/codemirror/mode/vbscript/vbscript.js'},
            {f:'/pkg/codemirror/mode/htmlmixed/htmlmixed.js'},
            {f:'/pkg/codemirror/formatting.js'}
         ],
         css:[
            {f:'/pkg/codemirror/lib/codemirror.css'},
            {f:'/css/npcodemirror.css'},
            /* search */
            {f:'/pkg/codemirror/addon/dialog/dialog.css'},
            {f:'/pkg/codemirror/addon/search/matchesonscrollbar.css'},
            /* fold */
            {f:'/pkg/codemirror/addon/fold/foldgutter.css'},
            /*Autocomplete*/ 
            {f:'/pkg/codemirror/addon/hint/show-hint.css'}
         ]
      }
   };  
   $.ControlChangeLastModified = function(url, callback) {
      var xhr;
      if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
           xhr=new XMLHttpRequest();
      }
      else{// code for IE6, IE5
         xhr=new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open('HEAD', url+"?t=" + Math.random(), true); // use HEAD - we only need the headers
      var GetStateOneTime=true;
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && GetStateOneTime) {
            GetStateOneTime=false;
            (xhr.status === 200)?callback(xhr.getResponseHeader('Last-Modified')):callback(false);
         };
      };
      xhr.send();
   };
   
   /*var getMTime = function(url, callback) {
      var xhr;
      if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
           xhr=new XMLHttpRequest();
      }
      else{// code for IE6, IE5
         xhr=new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open('HEAD', url, true); // use HEAD - we only need the headers
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.getResponseHeader('Last-Modified'));
            //xhr.getAllResponseHeaders()
         };
      };
      xhr.send();
   };*/
   npImages=[];
   var npImagesName=['/img/waiting1.gif'];
   for (var i=0;i<1;i++){
      var img=new Image();
      img.src=npImagesName[i];
      npImages.push(img);
   }
   $.NPTrim=function(s){
      return(s.replace(/(^\s*)|(\s*$)/g, ""));
   }
   //$.urlParam =
   /*$.NPUrlParam = function(name) {
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (!results) {
         return 0;
      }
      return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
   };*/
  
   $.StandardHtml=function(Str){
      var Result = {"flag":'',"Str":''};
      var regex = /(<[^>]*\son\w*=[^>]*>)|(<[^>]*\w*=\W\s*javascript\s*:[^>]*>)|(<\s*\/?\s*(script|source|embed|body|head|html|iframe|audio|object|frameset|meta)\s*.*?>)/gi
      var found = Str.match(regex);
      if(found == null)
         Result.flag = true;
      else   
         Result.flag = false;
      Result.Str = Str;   
      return Result;   
   }
   $.NPMaximizeMainDivAndChild=function(event,MainDiv,Child1Div,Child2Div){
      //npLog('widgetResized Sensed by golb1');
      var gap = $('body').outerHeight(true) - $('body').height(),
         NorthHeight=0;
      if (event){
         MainDiv=event.data.MainDiv;
         Child1Div=event.data.Child1Div;
         Child2Div=event.data.Child2Div;
      }
      $('body').height($(window).height() - gap);
      var BodHeight=$('body').height();
      if (Child1Div){
         NorthHeight=Child1Div.outerHeight(true);
         if (Child1Div.css('display')=='none'){
            NorthHeight=0;
         }
      }
      if (MainDiv){
         gap = MainDiv.outerHeight(true) - MainDiv.height();
         MainDiv.height(BodHeight - gap);
      }
      if (!Child2Div){
         alert('Child2Div not found');
      }

      gap = Child2Div.outerHeight(true) - Child2Div.height();
      Child2Div.height(BodHeight - gap - NorthHeight);
      Child2Div.find('>div.np-fitdivtoparent').each(function(i,v) {
         var myObj=$(v),  
             self, 
             myWidgetName=myObj.data('NPWidget');
         if (myWidgetName){
            self=myObj[myWidgetName]('instance');
            self.NotRequireResizeHandler=false;  
         }
      });         
      Child2Div.find('>div.np-fitdivtoparent:visible').each(function(i,v) {
         var myObj=$(v),  
             self, 
             myWidgetName=myObj.data('NPWidget');
         if (myWidgetName){
            self=myObj[myWidgetName]('instance');
            self.NotRequireResizeHandler=false;  
            var h=Child2Div.height();
            self.W_.$bod.parent().height(h);
            self.W_.$bod.height(h);
            self.ResizeHandler();
            self.NotRequireResizeHandler=true;  
         }
      });         
   }; 
   $.NPAttachWinResize = function(MainDiv,Child1Div,Child2Div){
      $(window).on('resize',{MainDiv:MainDiv,Child1Div:Child1Div,Child2Div:Child2Div},$.NPMaximizeMainDivAndChild);
      $.NPMaximizeMainDivAndChild(null,MainDiv,Child1Div,Child2Div);
   };
   /*$.NPOnDivResize=function(event,myDiv){
      //when window resize this function resize the #bod and #bod wrapper on current form
      var myDiv;
      if (event){
         myDiv=event.data.myDiv;
      }
      if (myDiv){
         myDiv.find('>div.np-fitdivtoparent:visible').each(function(i,v) {
           $(this).css('height',$(this).parent().css('height'));
           $(v).find('>div.np-fitdivtoparent:visible').each(function(index) {
              $(this).css('height',$(this).parent().css('height'));
           });
         });
      };
   };*/
   /*$.NPFitChildDivToFather=function(myDiv){
      $(window).on('resize',{myDiv:myDiv},$.NPOnDivResize);
      $.NPOnDivResize(null,myDiv);
   };*/
   $.CreateMenuTabs =
   $.NPCreateMenuTabs =
   function(ShowTabHeader,MenuTabFirstChild,CmpId){
      $.NPStartCmpId=CmpId;
      try{
         window.document.body.zoom=0.9
      }catch(e){
         
      }
      var SetFreeSpaceForMenuIcon=false;
      var Header='';
      //Header+='<div id="dvHeader" data-bind="FadeVisible:ShowHeader">';                             
      Header+='<div id="dvHeader" style="display:none" data-bind="visible:ShowHeader">';                             
      Header+='   <div style="position: absolute; left: 0px">';
      Header+='      <img src="/univ/unvarm.gif" />';
      Header+='   </div>';
      Header+='   <div style="top: 0px;" align="center">  به نام خدا    </div>';
      Header+='   <div style="top: 12px" align="center">';
      Header+='      <span>سامانه جامع دانشگاهي گلستان - </span><span id="rhead" data-bind="UniHtml:vm_rhead">   </span>';
      Header+='   </div>';
      Header+='   <div align="center" style="height: 10px">  </div>';
      Header+='</div>';

      var s='<div id="dvMenuTabs" style="padding: 0px;border: 0px">';
      s+='   <div id="dvMenuTabsHeader">';
      s+=Header;

      s+='      <div id="LangShow" style="position:absolute;display:none;z-index:10000" class="ui-state-highlight">Fa</div><div id="SettingsDiv" style="position:absolute;display:none;width:250px;padding-top:10px;z-index:1000;height:60px" class="ui-state-hover ui-dialog-content ui-widget-content" >'
      s+='         <label data-bind="UniHtml:vm_LastLogin"></label>'
      s+='         <table id="utype" style="display:none;width:100%"><tr><td><label>نوع کاربر</label></td><td><label data-bind="UniHtml:vm_UserType"></label></td><td align="left"><button id="ChangeStatus" style="padding-left:5px">تغییر وضعیت</button></td></tr></table>'
      s+='         <button id="Exit" style="position:absolute;bottom:5px;left:5px">خروج از سیستم</button>';
      s+='      </div>';
      s+='      <table id="tbHeader" style="border-collapse: collapse;width:100%">';
      s+='      <tr>';
      s+='         <td >';
      s+='            <table  style="border-collapse: collapse;width:100%;border-top-width: 0px;border-right-width: 0px;border-left-width: 0px;border-bottom-width: 0px" class=" ui-widget-header">';
      s+='              <tr>';
      s+='                 <td style="padding:0px">';
      s+='                    <ul style="padding:0px;-webkit-border-top-left-radius:0px;-webkit-border-bottom-left-radius:0px;-moz-border-top-left-radius:0px;-moz-border-bottom-left-radius:0px;border-top-left-radius:0px;border-bottom-left-radius:0px;border-left:0;border-top-width: 0px;border-bottom-width: 0px;" />';
      s+='                 </td>';
      s+='                 <td valign="top"  align="left" style="border-color:blue;width:220px;-webkit-border-top-right-radius:0px;-webkit-border-bottom-right-radius:0px;-moz-border-top-right-radius:0px;-moz-border-bottom-right-radius:0px;border-top-left-radius:0px;border-bottom-left-radius:0px;" >';
      s+='                    <table width="100%" >';
      s+='                       <tr>';
      s+='                          <td width="90%" align="left" >';
      s+='                           <span  data-bind="UniHtml:vm_UsrNamFam">  </span>';
      s+='                          </td>'; 
      s+='                          <td>';
      s+='                           <span id="np-icon-show-settings" class="ui-icon ui-icon-carat-1-s" >  </span>';
      s+='                          </td>';
      s+='                       </tr>';
      s+='                    </table>';
      s+='                 </td>';
      s+='              </tr>';
      s+='            </table>';
      s+='         </td>';
      s+='      <td style="width:80px" data-bind="visible:ShowHeader">';
      s+='      </td>';
      
      s+='      </tr>';
      s+='      </table>';   
      s+='   </div>';
      s+='   <div id="dvMenuTabWrapper" style="border:0px;padding: 0px;overflow:hidden" data-bind="StopBindings:true">';
      s+='   </div>';
      s+='</div>';
      $(s).prependTo('body');
      
      //var dvTempMenuForm=$('<div/>');
      //dvTempMenuForm.prop('id','dvTempMenuForm');
      //dvTempMenuForm.appendTo($("#dvMenuTabWrapper"));
      var dvMenuTabNav, dvMenuTabs, 
          dvMenuTabWrapper=$.NPVars['dvMenuTabWrapper']=$("#dvMenuTabWrapper"),
          dvMenuTabsHeader=$.NPVars['dvMenuTabsHeader']=$("#dvMenuTabsHeader");
      dvMenuTabs =$.NPVars['dvMenuTabs']= $( "#dvMenuTabs" ).tabs({
         beforeActivate:function(event,ui){
            var MenuLIId;
            (typeof(GlobViewModel)!=='undefined')&&GlobViewModel.MenuLI()&&(MenuLIId=GlobViewModel.MenuLI().prop('id'));
            if (MenuLIId){
               var ShowHeader, LastShowHeader=GlobViewModel.ShowHeader();
               if((ui.newTab.prop('id')==MenuLIId)){
                  ShowHeader=false;//true;
               }
               else{
                  ShowHeader=false;   
               }
               if (ShowHeader!=LastShowHeader){
                  GlobViewModel.ShowHeader(ShowHeader);
                  var BodHeight=$('body').height();
                  var NorthHeight=dvMenuTabsHeader.outerHeight(true);
                  var gap = dvMenuTabWrapper.outerHeight(true) - dvMenuTabWrapper.height();
                  dvMenuTabWrapper.height(BodHeight - gap - NorthHeight);
               }
            }
            dvMenuTabNav.removeClass("ui-helper-clearfix")  // For Set Background Of Menu Tab Change By Saeed Jafary !!
            var myObj=ui.oldPanel, self, 
                myWidgetName=myObj.data('NPWidget');
            if (myWidgetName){
               self=myObj[myWidgetName]('instance');
               self.SaveScrollTops();
            }
         },
         activate: function( event, ui ) {
            if(ui.newTab.context.innerText != undefined && ui.newTab.context.innerText != '???')
               $('title').text("سامانه جامع دانشگاهي گلستان - " + ui.newTab.context.innerText);
            else
               $('title').text("سامانه جامع دانشگاهي گلستان - " + $('title').text() );
            var myObj=ui.newPanel, self, 
                myWidgetName=myObj.data('NPWidget');
            if (myWidgetName){
               self=myObj[myWidgetName]('instance');
               if (!self.NotRequireResizeHandler){
                  var h=dvMenuTabWrapper.height();
                  self.W_.$bod.parent().height(h);
                  self.W_.$bod.height(h);
                  self.ResizeHandler();
               }
               self.NotRequireResizeHandler=true;  
               self.LoadScrollTops();
               var USRTYPE = $('aut',self.AutXml()).attr('ut');
               GlobViewModel.vm_UserType(USRTYPE == 0 ? "دانشجو" : (USRTYPE == 1 ? "استاد" : (USRTYPE == 2 ? "مدير" : (USRTYPE == 5 ? "داوطلب آزمون" : ""))));
               GlobViewModel.OpenedSelf=self;
            }
            else{//else is for sometimes that newPanel is still a div and not changed to widget
               var h=dvMenuTabWrapper.height();
               ui.newPanel.add(ui.newPanel.find('>div.np-fitdivtoparent')).height(h);
            }
            
            //$(window).resize();
         }//activate
      })
      .removeClass('ui-widget-content');

      dvMenuTabNav=$.NPVars['dvMenuTabNav']=dvMenuTabs.tabs('instance')._getList();//dvMenuTabs.find(".ui-tabs-nav");
      dvMenuTabNav
         .sortable({
            //axis: "x",
            /*sort: function( event, ui ) {
               var MenuId,ItemId;
               if ((MenuId=GlobViewModel.MenuLI().prop('id'))&&(ItemId=$(ui.item).prop('id'))&&(MenuId==ItemId))
                  return false;
            },*/
            stop: function() {
               if (GlobViewModel.MenuLI()&&GlobViewModel.MenuLI().length&&(GlobViewModel.MenuLI().index()>0)){
                  //send menu to first Item
                  GlobViewModel.MenuLI().parent().prepend(GlobViewModel.MenuLI());
               }
               dvMenuTabs.tabs( "refresh" );
            }
         });
      $.NPAttachWinResize(dvMenuTabs,dvMenuTabsHeader,dvMenuTabWrapper);
      if (MenuTabFirstChild){
         var FormId=MenuTabFirstChild.prop('id');
         MenuTabFirstChild.addClass('np-fitdivtoparent');
         MenuTabFirstChild.appendTo(dvMenuTabWrapper);
         var $FaciDiv2=MenuTabFirstChild;
         var tabTemplate2, 
             TabId2=$FaciDiv2.attr('id'),
             label2='???',//op.ftitle,//'فرم دروس',
             li2;
         tabTemplate2 = "<li id='#{liid}'><table class='np-MenuTabTable'><tr><td></td><td><a href='#{href}'>#{label}</a></td></tr></table></li>";
         
         li2 = $( tabTemplate2.replace( /#\{href\}/g, "#" + TabId2 ).replace( /#\{label\}/g, label2 ).replace( /#\{liid\}/g, "li-" + TabId2 ) );
         dvMenuTabNav.append(li2);
         dvMenuTabs.tabs("refresh");
         //dvMenuTabs.tabs( "option", "active",0);//0
      }
      
      NPGlobApplyBinding=
      function(){
         GlobViewModel={
            ShowHeader:ko.observable(),
            vm_rhead:ko.observable(''),
            vm_UsrNamFam:ko.observable(''),
            vm_LastLogin:ko.observable(''),
            vm_UserType:ko.observable(''),
            SettingsDiv:$('#SettingsDiv'),
            SettingsIcon:$("#np-icon-show-settings"),
            LangShow:$('#LangShow')
         }
         GlobViewModel.dvMenuTabs=dvMenuTabs;
         GlobViewModel.dvMenuUL=dvMenuTabNav;
         if ((CmpId)&&(FormsListId.indexOf(CmpId)>-1)){
            var MenuLIId, MenuLI=$('li',GlobViewModel.dvMenuUL);
            GlobViewModel.MenuLI=ko.observable(MenuLI);
            if (MenuLIId=$(MenuLI).prop('id'))
               GlobViewModel.dvMenuUL.sortable( "option", "cancel", "#"+MenuLIId );
         }
         else{
            GlobViewModel.MenuLI=ko.observable();
         }
         
         GlobViewModel.MenuLI.subscribe(
            function(NewValue){
               var MenuLIId;
               NewValue&&(MenuLIId=$(NewValue).prop('id'));
               if (MenuLIId&&GlobViewModel.dvMenuUL){
                  GlobViewModel.dvMenuUL.sortable( "option", "cancel", "#"+MenuLIId );
               }
            }
         );     
         ko.applyBindings(GlobViewModel, dvMenuTabsHeader[0]);
      };
      NPGlobApplyBinding();
      dvMenuTabs.tabs( "option", "active",0);//0
      //$.NPFitChildDivToFather(dvMenuTabWrapper);
   };
   
   //$.GetNPWidget = 
   $.NPGetWidget = 
   function(myObj,myWidgetName){
      if (!myWidgetName)
         myWidgetName=myObj.data('NPWidget');
      return myObj[myWidgetName]('instance');
   };
   //$.CreateNPWidget =
   $.NPCreateWidget =
   function(myObj,myWidgetName,myWidgetParam){
      //myObj.data('NPWidgetName','np-'+myWidgetName);
      myObj.data('NPWidget',myWidgetName);
      myObj[myWidgetName](myWidgetParam);
      var self=myObj[myWidgetName]('instance');
      myObj
      .on('mouseenter mouseleave mousedown mouseup focus blur'
         ,'button.np-icon-only,a.np-a-help,input.ui-autocomplete-input',function(e){
         if ($(this).hasClass('ui-button-disabled')){
            return;
         }
         var HlpIn,RelField,HlpArrElem;
         switch(e.type){
            case 'mouseenter':{
               if ($(this).is(':button'))
                  $(this).addClass( "ui-state-hover" );
               var ActNo=$(this).attr('np-act');
               if (self.Acts[ActNo]&&(HlpArrElem=self.Acts[ActNo].HlpArrElem)){//&&(HlpIn=self.Acts[ActNo].hlpin)
                  //$(eval(HlpIn)).each(function(i,v) {
                  //   TempElem=$('#'+v);
                  $.each(HlpArrElem,function(i,v){
                     var TempElem=v.Elem;
                     /* added by S.J */
                     //if(self.W_.FrmFld[TempElem.attr("orgid")] && self.W_.FrmFld[TempElem.attr("orgid")].Valid.OnAC)
                     //   TempElem.parent('div').addClass('ui-state-highlight');
                     /* added by S.J */
                     var myTagName=TempElem.prop("tagName");
                     if (myTagName&&(myTagName.toUpperCase()=='DIV')){
                        var LastBorderCssTopWidth=TempElem.css('borderTopWidth'),
                           LastBorderCssBottonWidth=TempElem.css('borderBottomWidth'),
                           LastBorderCssLeftWidth=TempElem.css('borderLeftWidth'),
                           LastBorderCssRightWidth=TempElem.css('borderRightWidth');
                        TempElem
                           .addClass('ui-state-highlight');
                        if (LastBorderCssTopWidth!==TempElem.css('borderTopWidth'))
                           TempElem.css('borderTopWidth',LastBorderCssTopWidth);                              
                        if (LastBorderCssBottonWidth!==TempElem.css('borderBottomWidth'))
                           TempElem.css('borderBottomWidth',LastBorderCssBottonWidth);                              
                        if (LastBorderCssLeftWidth!==TempElem.css('borderLeftWidth'))
                           TempElem.css('borderLeftWidth',LastBorderCssLeftWidth);                              
                        if (LastBorderCssRightWidth!==TempElem.css('borderRightWidth'))
                           TempElem.css('borderRightWidth',LastBorderCssRightWidth);                              
                     }
                     else{
                        TempElem
                           .addClass('ui-state-highlight');                              
                     }
                  });
                }
                break;
             }
            case 'mouseleave':{
               $( this ).removeClass( "ui-state-hover" );  
               $( this ).removeClass( "ui-state-active" );
               var ActNo=$(this).attr('np-act');
               if (self.Acts[ActNo]&&(HlpArrElem=self.Acts[ActNo].HlpArrElem)){//&&(HlpIn=self.Acts[ActNo].hlpin)
                  //$(eval(HlpIn)).each(function(i,v) {
                  //   $('#'+v).removeClass('ui-state-highlight');
                  $.each(HlpArrElem,function(i,v){
                     var TempElem=v.Elem;
                     TempElem.removeClass('ui-state-highlight');
                     /* added by S.J */
                     //if(self.W_.FrmFld[$('#'+v).attr("orgid")] && self.W_.FrmFld[$('#'+v).attr("orgid")].Valid.OnAC)
                     //   $('#'+v).parent('div').removeClass('ui-state-highlight'); 
                     /* added by S.J */                             
                  });
               }
               break; 
            }
            case 'mousedown':{
               if ($(this).is(':button'))
                  $(this).addClass( "ui-state-active" );
               break;
            }
            case 'mouseup':{
               $( this ).removeClass( "ui-state-active" );
               break;
            }
            case 'focus':{
               if ($(this).is(':button'))
                  $( this ).addClass( "ui-state-active" );
               break;
            }
            case 'blur':{
               $( this ).removeClass( "ui-state-active" );
               break;
            }
         }
      })
      .find(':input')
         .addClass('ui-widget ui-widget-content')
      .end()
      .find('button.np-icon-only')
         .addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only')
         .attr('role','button');
   };
   $.fn.NPFocus = function(){
     this.focus().select(); 
   };
   $.fn.OuterHTML = function() {
      return $('<div></div>').append(this.clone()).html();
   };
  
   $(function(){
      $(window.document).on('keyup',function(myEvent){
         switch(myEvent.type){
            case 'keyup':{
               var key, key2, shift, alt;
               var keyCode = $.ui.keyCode;
               key = (myEvent.keyCode ? myEvent.keyCode : myEvent.which);
               key2 = myEvent.which;
               shift = myEvent.shiftKey;
               alt = myEvent.altKey;
               if (alt&&shift&&key==67){
                  if (confirm('آیا مطمئن هستید می خواهید حافظه های موقت پاک شود؟')){
                     $.NPClearLocalStorage();                     
                  }
               }
               break;
            }
         }
         
      });
      
      if (!$.fn.scrollIntoView) {
         $.ajax({
            url : "/js/etc/jq_scrollintoview.js",
            cache : true,
            dataType : "script"
         });
      }
      var txt; 
      txt=
      "<script type='text/html' id='ColgroupNPGrid'>"
      +"<col data-bind=\"attr:{width:Width()+'px'}\" />"
      +"</script>";
      $('body').append($(txt));
      
      txt= 
      "<script type='text/html' id='HeaderTrNPGrid'>"
      +"<tr data-bind=\"template:{name:'ThNPGrid', foreach:$parent.ThTdNoHide($data,$context,'Th')}, npresizable: { animate: true  },npdraggable: { cursor: 'crosshair' }\" />"
      +"</script>";
      $('body').append($(txt)); 

      txt=   
      "<script type='text/html' id='ThNPGrid'>"
      +"<!-- ko if:(typeof(CheckBox)!='undefined') -->"+String.fromCharCode(10)
      +"<th class='npgrid-header' >"
      +" <input type=\"checkbox\" data-bind=\"click:function($data,ev){return $root.NpAllCheckedClick(ev,$data)},"
      +" checked:$root.IsNpAllChecked($data,$context) \" />"   
      +"</th>"
      +"<!-- /ko -->"+String.fromCharCode(10)

      +"<!-- ko if:(typeof(CheckBox)=='undefined') -->"+String.fromCharCode(10)
      +"<th class='npgrid-header' data-bind=\""
      +"    attr:{rowspan:RowSpan,colspan:ColSpanTemp(),"
      +"       dir:typeof(HDir) !== 'undefined' ? HDir : null, "
      +"       align:typeof(HAlign) !== 'undefined' ? HAlign : null},"
      +"    click:function($data,ev){return $root.HeaderRowClick(ev,$data)}\" "
      +">"
      +"    <span data-bind=\"UniHtml:Html() \"  />"
      +"    <span class='npgrid-sort'>"
      +"       <nobr>"
      +"          <span data-bind=\"css:$root.ClassName($data,$context) \" />"
      +"       </nobr>"
      +"    </span>" 
      +"</th>"
      +"<!-- /ko -->"+String.fromCharCode(10)
      +"</script>";
      $('body').append($(txt));
     
      txt= 
      "<script type='text/html' id='TBodyNPGrid'>"    
      +"<tr class='TR-NPGrid' style='border: currentColor; font-weight: normal;cursor: pointer;' "
      +"   data-bind=\"template:{name:'TdNPGrid', foreach:$parent.ThTdNoHide($data,$context,'Td')}"
      +"      ,css: $root.RowClassName($data,$context)"
      +"      ,click:function($data,ev){return $parent.RowClick(ev,$data)} "
      +"      ,event: { mouseover: $parent.mov, mouseout: $parent.mou }"
      +"      ,attr:{RadifIndex:$index}\" "
      +"/>"
      +"</script>";
      $('body').append($(txt));

      txt= 
      "<script type='text/html' id='DivRowsNPGrid'>"
      +"<div class='TR-NPGrid' style='border: currentColor; font-weight: normal;cursor: pointer;' "
      +"   data-bind=\"template:{name:'DivColsNPGrid', foreach:$parent.ThTdNoHide($data,$context,'Td')}"
      +"      ,css: $root.RowClassName($data,$context)"
      +"      ,click:function($data,ev){return $parent.RowClick(ev,$data)} "
      +"      ,event: { mouseover: $parent.mov, mouseout: $parent.mou }"
      +"      ,attr:{RadifIndex:$index}\" "
      +"/>"
      +"</script>";
      $('body').append($(txt));
      txt=
      "<script type='text/html' id='DivColsNPGrid'>"+String.fromCharCode(10)
      //+" <div class='npgrid-body-cell np-border-left-right' "
      +" <div class='' "
      +"      style='display:inline-block' "
      +"   data-bind=\"css:{'npgrid-header ui-state-default':id=='R'}"
      +"     ,style:{width:'150px'}"
      //+"     ,attr:{rowspan:RowSpan,colspan:ColSpanTemp(),"
      +"     ,attr:{"
      +"        dir:typeof(Dir) !== 'undefined' ? Dir : null, "
      +"        align:typeof(Align) !== 'undefined' ? Align : null }"
      +"      ,NpMultiLine:((typeof(MultiLine) !== 'undefined')&&(MultiLine=='1'))?'1':'0'"
      +"      ,template:{name:$data.TempName}"
      //+"      ,UniHtml:Html()"
      +"   \" "
      +" ></div>"+String.fromCharCode(10)
      +"</script>";
      $('body').append($(txt));
   
      txt=
      "<script type='text/html' id='TdNPGrid'>"+String.fromCharCode(10)
      +" <td class='npgrid-body-cell np-border-left-right' "
      +"   data-bind=\"css:{'npgrid-header ui-state-default':id=='R'}"
      +"     ,attr:{rowspan:RowSpan,colspan:ColSpanTemp(),"
      +"        dir:typeof(Dir) !== 'undefined' ? Dir : null, "
      +"        align:typeof(Align) !== 'undefined' ? Align : null }"
      +"      ,NpMultiLine:((typeof(MultiLine) !== 'undefined')&&(MultiLine=='1'))?'1':'0'"
      +"      ,template:{name:$data.TempName}"
      //+"      ,UniHtml:Html()"
      +"   \" "
      +" ></td>"+String.fromCharCode(10)
      +"</script>";
      $('body').append($(txt));

      txt=
      "<script type='text/html' id='TdNPGrid_Check'>"+String.fromCharCode(10)
      +" <input type=\"checkbox\" data-bind=\" checked:$root.IsNpCheck($data,$context) \" />"   
      +"</script>"
      
      +"<script type='text/html' id='TdNPGrid_Html'>"+String.fromCharCode(10)
      +" <span"
      +"   data-bind=\"UniHtml:Html()"
      +"   \" "
      +" ></span>"+String.fromCharCode(10)
      +"</script>"
      
      +"<script type='text/html' id='TdNPGrid_Text'>"+String.fromCharCode(10)
      +" <span"
      +"   data-bind=\"UniText:Html()"
      +"   \" "
      +" ></span>"+String.fromCharCode(10)
      +"</script>";
      $('body').append($(txt));
   });
})(jQuery);         
//forms.js
(function($){

NPCommanderButtonClass='NPCommanderButtons';
   MsgHeaderDlgId='dvfrmMessageHeader';
   MsgBodyDlgId='dvfrmMessageBody';
   MsgDlgId='dvfrmMessage';
   MsgBoxButtonID='MsgBoxButton';
   ReturnButtonID='ReturnButton';
   OpensFaciButtonID='OpenMenuButton';
   MenuFormID='dvMenuForm';
   tbFooterAlignment='tbFooterAlignment';
   ExitButtonID='ExitButtonID';
   $ErrorMessageText='خطا';
   $WarningMessageText='هشدار';
   $SucMessageText='پيغام';
   
   $ErrorMessageClass='ui-state-error np-state-error ';
   $WarningMessageClass='ui-state-highlight np-state-warning ';
   $SucMessageClass='ui-state-default np-state-suc ';
   
   $ErrorMessageType='A';
   $WarningMessageType='B';
   $SucMessageType='C';

   ko.bindingHandlers.StopBindings = {
       init: function() {
           return { controlsDescendantBindings: true };
       }  
   };
   
   ko.bindingHandlers['npEditorValue'] = { 
      'after' : ['options', 'foreach'],
      'init' : function(element, valueAccessor, allBindings, viewModel) {
         var eventsToCatch = ["change"];
         var $el=$(element);
         $el.npeditor({
            npform:viewModel._npform,
            change:function(ev,ui){
               var modelValue = valueAccessor();
               var elementValue = $("<div>"+ui.Val+"</div>").text()==''?'':ui.Val; // when ui.val is '<div><br></div>' then $(ui.Val).text()==''
               if (modelValue.peek() !== elementValue)
                  modelValue(elementValue);
            }
         });
         ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
             $el.npeditor('destroy');
         });
      },
      'update' : function(element, valueAccessor) {
         var $el=$(element),
             NewValue = ko.utils.unwrapObservable(valueAccessor());
         var elementValue = $el.npeditor('Val');
         var valueHasChanged = (NewValue !== elementValue);
         if (valueHasChanged) {
            var applyValueAction = function() {
               var Result = $.StandardHtml(NewValue);
               NewValue = Result.Str;
               $el.npeditor('Val',NewValue,Result.flag);
             
            };
            applyValueAction();
         }
      }
   };

   ko.bindingHandlers['HtmValue'] = { 
      'after' : ['options', 'foreach'],
      'init' : function(element, valueAccessor, allBindings) {
         var eventsToCatch = ["change"];
         var $el=$(element);
    
         $el.cleditor({
            width : $(element).width(),
            height : $(element).height()
         }).change(function() {
            var modelValue = valueAccessor();
            var elementValue = ko.selectExtensions.readValue(element);
            if (modelValue.peek() !== elementValue)
               modelValue(elementValue);
         });
         ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
             $.data($el[0],'cleditor').destroy();
         });
   
         /*ko.utils.arrayForEach(eventsToCatch, function(eventName) {
          var handler = valueUpdateHandler;
          ko.utils.registerEventHandler(element, eventName, handler);
          });*/
      },
      'update' : function(element, valueAccessor) {
         var NewValue = ko.utils.unwrapObservable(valueAccessor());
         var elementValue = ko.selectExtensions.readValue(element);
         var valueHasChanged = (NewValue !== elementValue);
   
         if (valueHasChanged) {
            var applyValueAction = function() {
               ko.selectExtensions.writeValue(element, NewValue);
               $.data(element, 'cleditor').updateFrame($.data(element, 'cleditor'));
            };
            applyValueAction();
         }
      }
   };
   //npcheckbox
   //noy:0 ==> 0:false, 1:true
   //noy:1 ==> 1:false, 2:true
   ko.bindingHandlers['npcb'] = {
      'after': ['value', 'attr'],
      'init': function (element, valueAccessor, allBindings) {
         function noy(){
            return allBindings['has']('noy')
                   ? ko.utils.unwrapObservable(allBindings.get('noy'))
                   : 0;
          }
         function updateModel() {
            // This updates the model value from the view value.
            // It runs in response to DOM events (click) and changes in checkedValue.
            var elemValue = element.checked;
            var WriteValue=(noy()==1)?(elemValue?'2':'1'):(elemValue?'1':'0');
            valueAccessor()(WriteValue);
         };
   
         var isCheckbox = element.type == "checkbox";
         // Only bind to check boxes 
         if (!isCheckbox ) {
            return;
         }
         // Set up two computeds to update the binding:
         //ko.utils.registerEventHandler(element, "click", updateModel);
         ko.utils.registerEventHandler(element, "change", updateModel);
      },
      'update': function (element, valueAccessor, allBindings) {
         function noy(){
            return allBindings['has']('noy')
                   ? ko.utils.unwrapObservable(allBindings.get('noy'))
                   : 0;
          }
         var modelValue = ko.utils.unwrapObservable(valueAccessor());
         var WriteValue= (noy()==1)?(modelValue=='2'?true:false):(modelValue=='1'?true:false);
         // When a checkbox is bound to any other value (not an array), being checked represents the value being trueish
         element.checked = WriteValue;
       }
   };
   //ko.expressionRewriting.twoWayBindings['npcb'] = true;
   
   
   /*ko.bindingHandlers['npAddClass'] = {
      'after' : ['options', 'foreach'],
      'update' : function(element, valueAccessor, allBindings) {
         var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
         var LastClass = allBindings.get('npAllClass') || '';
         var elem = $(element);
         elem.removeClass(LastClass);
         if (valueUnwrapped) {
            elem.addClass(valueUnwrapped);
         }
      }
   };*/

   //ko.expressionRewriting.twoWayBindings['HtmValue'] = true;
   //----GLOBAL FUNCTION-----------------
   $.fn.xml2 = function(all) {
      //result to return
      var s = "";
      //Anything to process ?
      if (this.length)
      //"object" with nodes to convert to string  
         (
            ((typeof all != 'undefined') && all) ?
            //all the nodes 
            this
            :
            //content of the first matched element 
            $(this[0]).contents()
         )
         //convert node(s) to string  
         .each(function() {
            try{
               s+='<?xml version="1.0" encoding="utf-8"?>'+(new XMLSerializer()).serializeToString(this);
            }
            catch(e){
               s+=this.xml;
            }
   /*       s += window.ActiveXObject ? //==  IE browser ?
          //for IE
           this.xml
           :
          //for other browsers
           (new XMLSerializer()).serializeToString(this)
           ;*/
      });
      while(s.indexOf(String.fromCharCode(10))>-1)
         s=s.replace(String.fromCharCode(10),'&#10;');
     return s;
   };
   
   // Function to get the Max value in Array 
   Array.max = function( array ){
      return Math.max.apply( Math, array );
   };
   // Function to get the Min value in Array
   Array.min = function( array ){
      return Math.min.apply( Math, array );
   };
   //-----END GLOBAL FUNCTION--------------------------------------------------------------
   $.widget("np.npDialog", $.ui.dialog, {
      /* error occure when move other dialog that visible and have a html editor component in them
       so we declare MobilityWeight option that show weight of this dialog for prevent movment*/
      options:{
         dialogClass:'np-npDialog',
         MobilityWeight:5,
         closeText:'بستن',
         position: {
            my: "center",
            at: "center",
            of: window
            //collision: "fit",
            // Ensure the titlebar is always visible
            /*using: function( pos ) {
               var topOffset = $( this ).css( pos ).offset().top;
               if ( topOffset < 0 ) {
                  $( this ).css( "top", pos.top - topOffset );
               }
            }*/
         } 
         
      },
      _create:function(){
         if (this.options.appendTo&&(this.options.position.of==window)){
            this.options.position.of=this.options.appendTo;
            delete this.options.position.using;
            delete this.options.position.collision;
         }
         this._super(); 
         this._setOption('title',this.options.title);
         //for show tooltip when title of dialog is bigger than dialog width's
         this.uiDialogTitlebar.find( ".ui-dialog-title" ).NpTooltip({
            track:true,
            items: "[np-title]:not([disabled])",
            content: function() {
               // support: IE<9, Opera in jQuery <1.7
               // .text() can't accept undefined, so coerce to a string
               if(!(this.offsetWidth<this.scrollWidth)){
                  return '';
               }
               var title = $( this ).attr( "np-title" ) || "";
               // Escape title, since we're going from an attribute to raw HTML
               return $( "<a>" ).text( title ).html();
            }
         });
      },
      _setOption: function( key, value ) {
         this._super( key, value );
         if ( key === "title" ) {
            this.uiDialogTitlebar.find( ".ui-dialog-title" ).attr('np-title',value);            
         }
      },      
      _moveToTop:function( event, silent ) {
         var Ret=this._super(event, silent);
         if ($.fn.npAutoComplete)
            $('input.ui-autocomplete-input',this.uiDialog).npAutoComplete('close');
         return Ret;
      }
      
      /* orginal code jqui-1.10.4, error occure when move other dialog that visible and have a html editor component in them
      _moveToTop: function( event, silent ) {
         var moved = !!this.uiDialog.nextAll(":visible").insertBefore( this.uiDialog ).length;
         if ( moved && !silent ) {
            this._trigger( "focus", event );
         }
         return moved;
      },*/
      /*orginal code jqui-1.11,
      _moveToTop: function( event, silent ) {
         var moved = false,
            zIndicies = this.uiDialog.siblings( ".ui-front:visible" ).map(function() {
               return +$( this ).css( "z-index" );
            }).get(),
            zIndexMax = Math.max.apply( null, zIndicies );
   
         if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
            this.uiDialog.css( "z-index", zIndexMax + 1 );
            moved = true;
         }
   
         if ( moved && !silent ) {
            this._trigger( "focus", event );
         }
         return moved;
      }, 
       */
      //this repair of _moveToTop in jqui-1.10.4 not require in jqui-1.11
      /*
       * 
       _moveToTop: function( event, silent ) {
         var self=this,op=self.options,
             thisMobilityWeight=op.MobilityWeight,
             VisObj=this.uiDialog.nextAll(":visible"),
             moved = !!VisObj.length;
         VisObj.not('.np-npDialog').insertBefore( this.uiDialog );
         VisObj=this.uiDialog.nextAll(":visible");
         while (VisObj.length){
            VisObj.each(function(i,v){
               var ww=$('#'+$(v).attr('aria-describedby')).npDialog('option','MobilityWeight');//$(v).npDialog('option','MobilityWeight');
               if (ww>thisMobilityWeight)
                  $(self.uiDialog).insertAfter(v);
               else
                  $(v).insertBefore( self.uiDialog );
            });
            
            VisObj=this.uiDialog.nextAll(":visible");
         }
         if ( moved && !silent ) {
            this._trigger( "focus", event );
         }
         return moved;
      } */  
   });  
   $.widget("np.npButton", $.ui.button, {   
      _create : function() {
         var self = this, op = self.options, e = self.element;
         this._super();
         if (op.icons && op.icons.primary && (op.icons.primary.indexOf('np-icon') > -1))
            e.find('.ui-button-icon-primary.ui-icon')
            .addClass("np-icon");
         if (op.icons && op.icons.secondary && (op.icons.secondary.indexOf('np-icon') > -1))
            e.find('.ui-button-icon-secondary.ui-icon')
            .addClass("np-icon");
      },
      _setOption: function( key, value ) {
         this._super( key, value );
         if ( key === "disabled" ) {
            if (value)
               $(this.element).triggerHandler('npdisable');
         }
      },
      _destroy : function() {
         var self = this, op = self.options, e = self.element;
         e.find('.np-icon')
            .removeClass("np-icon");
         self._super();
      }
   }); 

//--KO NP GLOBAL Custom Binding -------
//--END KO NP GLOBAL Custom Binding -------

   //$.getScrollbarWidth =
   $.NPGetScrollbarWidth =
   function() {
      var $d = $('<div />').css({
            width : 100,
            height : 100,
            overflow : 'scroll',
            position : 'absolute',
            top : -200,
            left : -200
      })
      .append($('<div />').css({
            width : 200,
            height : 200
      }))
      .appendTo('body');
      var wi=$d.width()-$d[0].clientWidth;
      $d.remove();
      return wi;
   };
    
    //TODO have to delete
    $.fn.npicon=function(icontype,iconsize,exclass){
        if(!exclass)exclass = 'ui-state-default';
        var ic=(icontype.substr(0,2)=='np'?'np':'ui')+'-icon';
        this.addClass( 'np-icon-only ui-corner-all '+exclass)
            .attr('role','button')
            .attr('href',"#")
            .children('div')
            .addClass('size'+iconsize+' '+icontype+' ' +ic);
        return this;
    };    
    

//-- np tinybutton -----
   $.widget("np.nptinybutton", {
      options: {
         icon: 'edit', //edit,delete,view,help,send,confirm,detail,viewflow,viewflowA
         title: null
      },
      _create: function() {
         var self = this,
             op = self.options,
             e = self.element;
         if (!op.title) {
            op.title = (op.icon == 'edit') ? 'اصلاح' : 
                       (op.icon == 'delete') ? 'حذف' : 
                       (op.icon == 'view') ? 'نمايش' : 
                       (op.icon == 'help') ? 'راهنما' : 
                       (op.icon == 'send') ? 'ارسال' : 
                       (op.icon == 'confirm') ? 'تاييد' : 
                       (op.icon == 'detail') ? 'جزييات' :
                       (op.icon == 'viewflow') ? 'مشاهده گردش کار' : 
                       (op.icon == 'viewflowA') ? 'مشاهده گردش کار اتوماسيون' : '-';
         }
         e.html('&nbsp;')
         .attr('title', op.title)
         .attr('np-icon', op.icon)
         .addClass('np-tinyicon np-tinyicon-' + op.icon);
      },
      cont: function() {
         var self = this,
             op = self.options,
             e = self.element;
         return e.OuterHTML();
      },
      _destroy: function() {
         var $e=$(this.element);
         $e.removeClass('np-tinyicon np-tinyicon-' + this.options.icon)
         .removeAttr('np-icon')
         .removeAttr('title');
        }
    });

//--- NPFORM Widget ------
   $.widget( "np.npform", {
      options: {
         fname : '', //نام فایل فرم بدون پسوند. جهت یافتن سایر فالهای مرتبط با فرم استفاده می شود. در نام سایر فایل ها از این نام استفاده شده است.
         inxml:null,
         AfterClose:null,
         AfterOpen:null,
         ReturnParam:null
      },
      gettinybutton:function(icon,p){
         var title=
            (icon == 'edit') ? 'اصلاح' : 
            (icon == 'delete') ? 'حذف' : 
            (icon == 'view') ? 'نمايش' : 
            (icon == 'help') ? 'راهنما' : 
            (icon == 'send') ? 'ارسال' : 
            (icon == 'confirm') ? 'تاييد' : 
            (icon == 'detail') ? 'جزييات' :
            (icon == 'viewflow') ? 'مشاهده گردش کار' : 
            (icon == 'viewflowA') ? 'مشاهده گردش کار اتوماسيون' : '-';
         p=p||{};
         var attr=''
         $.each(p,function(i,v){
            attr=i+'="'+v+'" '
         });   
         return '<button title="'+title+'" np-icon="'+icon+'" class="np-tinyicon np-tinyicon-'+icon+'" '+ attr+'>&nbsp;</button>'; 
      },
      _CreateMessageBox:function() {
         var self = this, op = self.options, e = self.element,$e=$(e);
         self.W_.$MessageDialog = 
            $('<div dir="rtl" style="padding:2px" class="ui-state-hover" />')
            .appendTo(self.W_.$bod);
         
         self.W_.$MessageBodyDialog=$('<div dir="rtl" />')
            .prependTo(self.W_.$MessageDialog);
         var w = self.W_.$MessageDialog.width(), h = self.W_.$MessageDialog.height();
         self.W_.$MessageDialog.npDialog({
            MobilityWeight:0,
            closeOnEscape : true, //false ,
            autoOpen : false,
            appendTo : self.W_.$bod,
            width : w,
            height : h,
            title : 'پنجره پيغامها',
            hide : {
               effect : "transfer",
               duration : 700,
               to : ('[for="' + self.MakeFullId(MsgBoxButtonID) + '"]'), //for input
               className : "np-border-all"
            },
            beforeClose : function() {
               //when we use transfer effect to close dialog we must close the dialog form by myself
               //so when we want to close immidiately and maybe want to open immidiately we must set
               //  hide and beforeClose to null
               setTimeout(function() {
                  self.W_.$MessageDialog
                     //.parent()
                     .npDialog('widget')
                     .css('display', 'none');
               }, 1);
            },
            close : function() {
               self.W_.$MessageButton
               .prop('checked', false)
               .npButton('refresh');
            }
         });
         self.W_.$MessageHeaderDialog=$('<div dir="ltr" style="display:inline-block;position:absolute;left:1em;top:0em" />')
            .prependTo($('.ui-dialog-titlebar',self.W_.$MessageDialog.npDialog('widget')));
         var s = '';
         s += '<input type="checkbox" id="' + self.MakeFullId('check1') + '" npmessagetype="' + $ErrorMessageType + '"/><label dir="rtl" for="' + self.MakeFullId('check1') + '">خطا</label>';
         s += '<input type="checkbox" id="' + self.MakeFullId('check2') + '" npmessagetype="' + $WarningMessageType + '"/><label for="' + self.MakeFullId('check2') + '">هشدار</label>';
         s += '<input type="checkbox" id="' + self.MakeFullId('check3') + '" npmessagetype="' + $SucMessageType + '"/><label for="' + self.MakeFullId('check3') + '">پيغام</label>';
         self.W_.$MessageHeaderDialog.append('<div class="ui-widget-header">' + s + '</div>');
         self.W_.$MsgDlgErrBut=$('input:eq(0)', self.W_.$MessageHeaderDialog).npButton({
            icons : {
               primary : "ui-icon-alert"
            }
         });
         self.W_.$MsgDlgWarBut=$('input:eq(1)', self.W_.$MessageHeaderDialog).npButton({
            icons : {
               primary : "ui-icon-notice"
            }
         });
         self.W_.$MsgDlgSucBut=$('input:eq(2)', self.W_.$MessageHeaderDialog).npButton({
            icons : {
               primary : "ui-icon-info"
            }
         });
         self._on($('input', self.W_.$MessageHeaderDialog),{
            click:function(event) {       
               $(event.currentTarget).npButton('refresh');
               self.W_.$MessageBodyDialog
                  .find('[npmessagetype=' + $(event.currentTarget).attr('npmessagetype') + ']')
                  .css('display', $(event.currentTarget).prop('checked') ? '' : 'none');
            }
         })
      },         

      _CreateCommanderButtons:function() {
         //create table in footer for MsgBoxButton on Left of commander
         var self = this, op = self.options, e = self.element;
         var AllObjInFooterBeforeAddTable = self.W_.$dvfrmFooter.children();
         self.W_.$tbFooterAlignment=$('<table id="' + self.MakeFullId(tbFooterAlignment) + '" width="100%"><tr><td ></td><td dir="ltr"></td></tr></table>')
            .appendTo(self.W_.$dvfrmFooter);
         var td0=$('tbody>tr>td:eq(0)' , self.W_.$tbFooterAlignment)
         AllObjInFooterBeforeAddTable.appendTo(td0);
         $('button', td0).each(function(i, ThisBtn) {
            var IconName;
            switch(self.MakeOrgId(ThisBtn.id)) {
               case "IM01": {
                  IconName = "np-icon-check";
                  break;
               }
               case "IM02": {
                  IconName = "ui-icon-disk";
                  break;
               }//ui-icon-check";break;}
               case "IM03": {
                  IconName = "ui-icon-close";
                  break;
               }
               case "IM04": {
                  IconName = "ui-icon-disk";
                  break;
               }//ui-icon-pencil";break;}
               case "IM09": {
                  IconName = "ui-icon-disk";
                  break;
               }//ui-icon-pencil";break;}
               case "IM08": {
                  IconName = "ui-icon-search";
                  break;
               }
               case "IM99": {
                  IconName = "";
                  break;
               }
               //case ExitButtonID: {
               //   IconName = "ui-icon-circle-close";
               //   break;
               //}
            }
            $(ThisBtn).addClass(NPCommanderButtonClass)
            //.addClass('np-icon')
            .npButton({
               icons : {
                  secondary : IconName
               }
            });
            // قبل از تنظيم اندازه‌ها بايد كليد ها را درست كنيم.
            //if (self.MakeOrgId(ThisBtn.id) == ExitButtonID) {
            //   $(ThisBtn).removeClass(NPCommanderButtonClass).on('click', $.proxy(self.LogOut, self));
            //}
            //if (self.MakeOrgId(ThisBtn.id) == 'F43') {//تغییر وضعیت کاربر
            //   $(ThisBtn).removeClass(NPCommanderButtonClass);
            //}
         });
         //AllObjInFooterBeforeAddTable.appendTo($('#' + self.MakeFullId(tbFooterAlignment + '>tbody>tr>td')).eq(0));
         //'$dvfrmFooter'
         //كليدهاي دستور را به اولين خانه جدول اضافه مي كند

         /*if (e.attr('id') == MenuFormID) {
            //در فرم منو کلید امکانات باز را می سازیم
            var TempMenuTabsHeader;
            self.$OpensFaciButton=$('<button id="' + self.MakeFullId(OpensFaciButtonID) + '" style="">امکانات باز</button>')
            .appendTo($('#' + self.MakeFullId(tbFooterAlignment) + '>tbody>tr>td').eq(1))
            .npButton({
               icons : {
                  secondary : "ui-icon-gear"
               }
            })
            .on('click', $.proxy(self.CloseMenuForm, self))
            .hover(
               function() {
                  if ($(this).hasClass('ui-button-disabled'))
                     return;
                  TempMenuTabsHeader = $('<div/>').addClass('ui-tabs ui-widget ui-corner-all').width('100%').css({
                     padding : 0,
                     position : 'absolute',
                     border : '0px',
                     display : 'none'
                  }).append($("#MenuTabsHeader").clone());
                  $('*', TempMenuTabsHeader).prop('id', '');
                  TempMenuTabsHeader.appendTo('#' + MenuFormID).show('fade');
               }, 
               function() {
                  if ($(this).hasClass('ui-button-disabled'))
                     return;
                  TempMenuTabsHeader.remove();
                  TempMenuTabsHeader = null;
               }
            );

         } else {
            
         }*/
      
         if (op.ParentCmp){
            return;  
         }

         var td1=$('tbody>tr>td:eq(1)' , self.W_.$tbFooterAlignment);
         if (!op.ReturnCaption){
            op.ReturnCaption='بازگشت';
         }
         self.W_.$ReturnButton=
            $('<button id="' + self.MakeFullId(ReturnButtonID) + '" style="display:none"></button>')
            .text(op.ReturnCaption)
            .appendTo(td1)            
            .npButton();
         self._on(self.W_.$ReturnButton,{
            click:function(){
               if (op.$FaciDialogDiv){
                  self.CloseDialog();
               }
               else{
                  self.Close();
               }
            }
         });

         $('<input type="checkbox" id="' + self.MakeFullId(MsgBoxButtonID) + '" /><label dir="rtl" for="' + self.MakeFullId(MsgBoxButtonID) + '">پيغامها</label>')
         .appendTo(td1);
         self.W_.$MessageButton=
            $('#' + self.MakeFullId(MsgBoxButtonID), td1)
            .npButton({label:'پبجره پيغامها'});
         var tooltipclass='ui-state-highlight';
         self.W_.$MessageButton
         .attr('title','')
         .tooltip({  
            //content:'' , 
            content: function() {
               // support: IE<9, Opera in jQuery <1.7
               // .text() can't accept undefined, so coerce to a string
               var title = $( this ).attr( "title" ) || "";
               // Escape title, since we're going from an attribute to raw HTML
               //return $( "<a>" ).text( title ).html();
               return title;
            },
            tooltipClass:tooltipclass+' np-tooltip-message',
            position: {
               my: "left bottom",
               at: "left top",
               using: function( position, feedback ) {
                        $( this ).css( position );
                        $("<div class='"+tooltipclass+"' style='"+
                          "width: 10px; height: 10px; left: 10px; bottom: -5px;"+
                          " position: absolute; box-shadow: 6px 5px 9px -9px black;"+
                          "-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);"+
                          "-o-transform: rotate(45deg);tranform: rotate(45deg);"+
                          "border-top: none;border-left: none;"+
                          "'></div>" ) 
                           .appendTo( this );
                    }
            }
            /*,open: function( event, ui ) {
               ui.tooltip.animate({ 
                  top: ui.tooltip.position().top+200,
                  left: ui.tooltip.position().left-200 
               }, "slow" );
            }*/
         });
         self.W_.$MessageButton.npButton('widget').hide();
         self._on(self.W_.$MessageButton,{
            click:function(event) {
               if ($(event.currentTarget).prop('checked')) {
                  self.W_.$MessageDialog.npDialog('open');
                  var hh= self.W_.$bod.height(),
                      h = self.W_.$MessageBodyDialog.height() + self.W_.$MessageHeaderDialog.height() + 100;
                  if (h > hh * 0.8) {
                     h = hh * 0.8;
                  }
                  //self.W_.$MessageDialog.npDialog("option",'width',w)
                  self.W_.$MessageDialog.npDialog("option", 'height', h);
               } 
               else{
                  self.W_.$MessageDialog.npDialog('close');
               }
            }
         });
      },
      GetCover:function(myObj) {
         var self = this, op = self.options, e = self.element;
         if (!myObj) {
            return null;
         }
         while (myObj.parent()) {
            if ((myObj.parent()[0].id == self.MakeFullId('dvfrmFooter')) || (myObj.parent()[0].id == self.MakeFullId('dvfrmCenter')) || (myObj.parent()[0].id == self.MakeFullId('bod')) || (myObj.parent()[0].id == self.MakeFullId('dvfrmCenter'))) {
               return myObj.parent();
            }
            myObj = myObj.parent();
         }
         return null;
      },
      _create:function(){
         var self = this, op = self.options, e = self.element, $e=$(e);
         self.WebBusy=false;
         self.ExitFromSystem = false;
         self.ExitMsg = true;
         self.BackSpaceFocus = true;
         self.IsJSON=CmpByJSON.indexOf(op.CmpId||$.NPStartCmpId)>-1;
         //if (self.IsJSON)
         self.EmptyMessage={msg:{errors:[],war:[],suc:[]}};
         //else
         //   self.EmptyMessage=$('<root><msg></msg></root>');//$($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg></msg>'));
            
         //self.FormInProcess=false;
         //ContId==>container id. use it as id prefix for included object id
         //$('a.header',$(e)).npButton();
         self.ContId =  e.uniqueId().attr('id');
         self.V_={}; //For Decalre Variables By Programmers
         self.W_={}; //For Decalre Variables Used internally
         self.W_.OpenedDialogs={};
         self.W_.StayedForm={};
         self.Resp=null;
         self.UserLvl=0;
         self.W_.FrmFld={};//[];
         self.W_.FrmFld_Grd={};//[];
         self.W_.FrmFld_StateNo={};//[];
         self.W_.FrmFld_Htm={};//[];
         self.W_.FrmFld_PDat={};//[];
         self.W_.FrmFld_GDat={};//[];
         
         self.W_.Alias2Id={};//[];
         
         self._SndXML=null;
         self.$ValidXml=null; // xml of validation
         self.ActNo= ''; // act fa'al
         self.FMod= '';
         self.NextAct= ''; // Next act
         self._Grd=[];/*آرايه مربوط به گرید های فرم. هر عنصر آرایه ابجکتی است شامل موارد زیر
                id     :  آی دی المان مربوطه در فرم(در مورد راهنما المان مربوطه وجود ندارد و باید هنگام اجرا ایجاد شود)ٍ
                tit    : عنوان راهنما 
                col    : col tag. include width of each grid column
                th     : th tag. include header title (column caption)
                dat  : ایکس ام ال مربوط به اطلاعات گرید
               */
         self.HelpDialogs={};/*self.HelpDialogs['Act20']*/
         self.HelpGrids={};  /*self.HelpGrids['Act20']*/
         //self.ValidationWidget=null;
         self.IsBindingInProgress=false; //when ko.binding in process call change of All select
         //تنظیم اندازه بالا و پایین فرم
         
         $("[id]",$e).each(function(i,v){ // unique kardan ID ha
            var Id,$v=$(v);
            Id=$v.prop('id');
            $v.data('orgid',Id);
            $v.attr('orgid',Id);
            $v.prop('id',self.MakeFullId(Id));  
         });
         $("label[for]",$e).each(function(i,v){
            var $v=$(v); 
            $v.prop('for',self.MakeFullId($v.attr('for')));  
         });
         self.W_.$dvfrmHeader=$('#' + self.MakeFullId('dvfrmHeader'),$e);
         self.W_.$dvfrmCenter=$('#' + self.MakeFullId('dvfrmCenter'),$e);
         self.W_.$dvfrmFooter=$('#' + self.MakeFullId('dvfrmFooter'),$e);
           
         self.W_.$bod=$('#' + self.MakeFullId('bod'),$e);
         self.W_.$bod.npmessage();

         if (!op.ParentCmp){
            self._CreateMessageBox();
         }
         if (!op.ParentCmp)//newwwww
            self._CreateCommanderButtons();
         self.ViewModel={
            ContId:self.ContId,
            _npform:self,//use in bindingHandler of autocomplete
            vm_FullId:function(id){
               return self.MakeFullId(id);
            },
            vm_ResetClicked:function(){
               self.ResetClick();
            },
            vm_FaciHelp:function(){
               self.FaciHelp(); 
            },
            vm_Trigger: function(FuncName){
               self._trigger(FuncName); 
            },
            vm_ValText: function ($data, bindingContext, id) {
               return   function($data, MyRoot, id) {
                           var Opt = MyRoot[id+'_OPT'](),
                               Val= MyRoot[id]();
                           for (var TmpCnt = 0; TmpCnt < Opt.length; TmpCnt += 1) {
                              var data = Opt[TmpCnt];
                              if (data.val === Val) 
                                 return data.val+') '+data.dsc;
                           }
                           return ; // if return '' so combo can't showerror 'نمی تواند خالی باشد'
                        }($data, bindingContext.$root, id);
            },

            vm_DoAct: function(act,HEvent,ishelp,Params){//ishelp:true means action is a help
               var HelpId=HEvent&&HEvent.currentTarget&&HEvent.currentTarget.id?HEvent.currentTarget.id:'';
               Params = Params || {};
               Params.IsHelp = ishelp;
               self.DoAct(act,HelpId,Params);
            } 
         };
         //self.InParam=$(op.inxml).clone()
         self.InParam=op.inxml;
         if (op.ParentCmp){
            self.EnableAllField=false;//enableF in form generator that use component
            //self.ParentCmp=op.ParentCmp;
            self.ReadyCallBack_cnt=0;
         }
         if (op.OpenerSelf){
            //self.OpenerSelf=op.OpenerSelf;
         }
         if (!op.IsCmp&&!op.UseOpenerAut){
            var Aut=$('aut',op.inxml);
            if (Aut.attr('debug')=='1'){
               alert('debug mode');
               npDebugMode=true;
            }
            if (self.IsJSON){
               self.Aut={aut:self.Xml2Obj(Aut)};
            }else{
               self.Aut=$('<x/>');//$.parseXML('<x/>');
               self.Aut.append(Aut.clone());
            }
         }
         if (!op.CmpId){// for first page such as menu request server for include oaut
            self.IsJSON?(self.Auth.aut.incoaut='1'):$('aut',self.Aut).attr('incoaut','1');
         }
         //if (op.ParentCmp){
         self.CreateWaitingDialog();
         self.OpenWaitingDialog({NoOverlay:true});
         if (op.CmpId){//||op.UseOpenerAut||op.ParentCmp){//self.ParentCmp && op.UseOpenerAut movaghat ezafe shod.
            self.GetXmlValidation();
         } 
         else{
            //call for directly open form
            var CompId=$.NPStartCmpId;
            $.ControlChangeLastModified(op.fname+'.htm',function(NewLastModifAspx){
               var LastModifAspx=$.NPLocalStorage(CompId,"FPCC"),//FirstPageControlChange
                   nocache1=false,nocache2=false;
               if (!NewLastModifAspx){
                  alert('error in get "'+op.fname+'.htm" header');
                  return;
               }
               if (!LastModifAspx||(LastModifAspx!==NewLastModifAspx)){
                  nocache1=true;
               }
               $.ControlChangeLastModified('/js/forms.js',function(NewLastModifFormJs){
                  var LastModifFormJs=$.NPLocalStorage(1,"FORMSJS");//forms.js
                  if (!NewLastModifAspx){
                     alert('error in get "/js/forms.js" header');
                     return;
                  }
                  if (!LastModifFormJs||(LastModifFormJs!==NewLastModifFormJs)){
                     nocache2=true;
                  }
                  $.NPLocalStorage(CompId,"FPCC",NewLastModifAspx);
                  $.NPLocalStorage(1,"FORMSJS",NewLastModifFormJs);
                  if (nocache1){
                     $.ajax({
                        url : op.fname+".xml",
                        cache : true,
                        async : true,
                        dataType : "text",//xml
                        beforeSend: function(xhr) {
                           xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
                           xhr.setRequestHeader("Pragma", 'no-cache');
                        },   
                        success : function(xmldata, textstatus) {
                           location.reload(true);
                        }
                     });
                  }
                  else if (nocache2){
                     location.reload(true);
                  }
                  else{
                     self.GetXmlValidation();  
                  }
               });
            });
         };
         /*
         $(window).on('beforeunload', function(e) {

            if (self.ExitMsg) {// در حالتی که دکمه خروج کلیک شده است نباید پیغام را نشان دهیم
               return "آیا مایلید از سیستم جامع دانشگاهی گلستان خارج شوید ؟";
            }
         });

         $(window).on('unload', function(e) {

            if (self.ExitMsg) {
               self.LogOut();
            }
         });*/
      },// end of _create()
      ReplaceParameter:function(P_,XML){
         var self = this, op = self.options, e = self.element;
         function escapeXml(unsafe) {
             return unsafe.replace(/[<>&'"]/g, function (c) {
                 switch (c) {
                     case '<': return '&lt;';
                     case '>': return '&gt;';
                     case '&': return '&amp;';
                     case '\'': return '&apos;';
                     case '"': return '&quot;';
                 }
             });
         }         
         P_=P_||{};
         $.each(P_, function(Name, Val) {
            //XML=XML.replace(new RegExp('#'+Name+'#','g'),Val);   
            XML=XML.replace(new RegExp('#'+Name+'#[^"\']*','g'),escapeXml(Val));//replace "#P_xxx#Def" to new value    
         });
         XML=XML.replace(new RegExp('#P_[^#]+#','g'),'');//remove "#P_xxx#" of "#P_xxx#Def"
         return XML;
      },
      CreateFrmFlds:function(){
         var self=this;
         $.each(self.W_.FrmFld,function(id,ThisFrmFld){
            var Valid_=ThisFrmFld.Valid;
            var md=ThisFrmFld['md'];
            var Elem;
            if (Valid_.Typ=='Cmp'){//($v.attr('Typ')=='Cmp'){
               //Elem=$('#'+self.MakeFullId(id+'_W_'),self.W_.$bod);
               //ThisFrmFld.Elem=Elem;
               ThisFrmFld.WidgetSelf=$.NPGetWidget(ThisFrmFld.Elem,ThisFrmFld.WidgetName); //ThisFrmFld.WidgetName is null for faci
               Elem=ThisFrmFld.Elem; //ThisFrmFld.Elem set in CreateComponent
               var WidgetSelf=ThisFrmFld.WidgetSelf;
               //$('md',$v).each(function(j,o){
               //   WidgetSelf.SetRelationChildToParent($(o).attr('ChId'),$(o).attr('PId'))
               //});
               ThisFrmFld.mdChild&&$.each(ThisFrmFld.mdChild,function(j,o){
                  WidgetSelf.SetRelationChildToParent(o.ChId,o.PId);
               });
               if (Valid_.UrlF){//($v.attr('UrlF')){
                  ThisFrmFld.IsFaci=false;
                  if (!md){
                     self.ViewModel[id].subscribe(function(NewValue){
                        var xml=$('r',$.parseXML('<r/>')).append($('<outpar/>')),
                            outpar=$('outpar',xml),
                            NewValueXml=$($($.parseXML(NewValue)).children());//$('row',$.parseXML(NewValue));
                        if (NewValueXml.length){
                           $.each(NewValueXml[0].attributes, function(i, v) {
                              outpar.attr(v.name,v.value);
                           });
                           //$.NPGetWidget(Elem)
                           WidgetSelf
                           ._XML2ViewModel(xml,{NoInternalChg_OnSubs:!self.InternalChg_OnSubs});
                        }
                     });
                  }
               }
               else{
                  ThisFrmFld.IsFaci=true;
               }
            }
            else{
               //Elem=$('#'+self.MakeFullId(id),self.W_.$bod);
               //ThisFrmFld.Elem=Elem;
               ThisFrmFld.Elem=self.GetFldElem(id);
            };
         });   
      },
      GetFldElem:function(id){ 
         var self=this, 
             ThisFrmFld=self.W_.FrmFld[id],
             Elem=ThisFrmFld.Elem;
         if (!Elem&&(ThisFrmFld.Type!=='_Var')){
            Elem=$('#'+self.MakeFullId(id),self.W_.$bod);
            ThisFrmFld.Elem=Elem;
         }
         return Elem; 
      },
      GetFldWidgetElem:function(id){
         var self=this,
             ThisFrmFld=self.W_.FrmFld[id],
             WidgetElem=ThisFrmFld.WidgetElem,
             Elem;
             
         if (!WidgetElem){
            Elem=self.GetFldElem(id);
            if (!Elem){
               return undefined;
            }
            if (ThisFrmFld.Valid.OnAC){
               if (Elem.is(':np-npAutoComplete')){
                  WidgetElem=Elem.npAutoComplete('widget');
               }
            }
            if (ThisFrmFld.Valid.Typ=='Grd'){
               if (Elem.is(':np-npgrid')){
                  WidgetElem=Elem.npgrid('widget');
               }
            }
            if (ThisFrmFld.Valid.Typ=='But'){
               if (Elem.is(':np-npButton')){
                  WidgetElem=Elem.npButton('widget');
               }
            }
            //else{
            //   WidgetElem=Elem;   
            //}
            ThisFrmFld.WidgetElem=WidgetElem;
         }
         return WidgetElem;
      },
      GetXmlValidation:function(){
         var self = this, op = self.options, e = self.element;
         function RecieveXML(data){
            self.$ValidXml = $($.parseXML(self.ReplaceParameter(op.P_,data)));
            self.AfterGetXmlValidation(function(){
               self.CreateFrmFlds();
               self.CreateViewModelFinal();
            });
         }
         var XML;
         if (op.CmpId&&(XML=$.NPLocalStorage(op.CmpId,"XML"))){//$.NPComponentsXml[op.CmpId]){
            RecieveXML(XML);
            return;
         }
         $.ajax(op.fname+".xml",{ // get xml of validations
            dataType : "text",//xml
            error:function(jqXHR, textStatus, errorThrown){
               alert('error occur at get xml validation');
               self.CloseWaitingDialog();
            },
            success:function(data){
               RecieveXML(data);
            }
         });//$.ajax
      }, 
      //CreateFrmFld:function(id){//,$v){
      //}, 
      AfterGetXmlValidation:function(PreCallback,SecCallback){//GetAllPkgCmpCallBack){
         var self=this;
         if (!SecCallback){
            SecCallback= PreCallback;
            PreCallback=null;
         }
         var NPPkgNamesArr=[];
         $("r>load", self.$ValidXml).each(function(i,v){
            $.each(v.attributes,function(j,o){
               var PkgName=o.value;
               if ($.NPPkgs[PkgName]){
                  NPPkgNamesArr.push(PkgName);
               }
            });
         })
            
         self.NewComponentsObj={};//=$.NPComponentsHtml[self.ContId]={};
         self.NewComponentsLen=0;
         self.FormComponentsIdArr=[];
         self.FormFacisIdArr=[];
         var CmpTypXml=$("r>n[Typ='Cmp']", self.$ValidXml);
         CmpTypXml.each(function(i,v){
            var $v=$(v),
                ComponentName=$v.attr('UrlF'),
                UrlP=$v.attr('UrlP'),
                CmpId=$v.attr('CmpId'),
                id=$v.attr('id');
            if (!id) 
               return;
            if (ComponentName&&UrlP&&!$.NPLocalStorage(CmpId,'HTML')&&!self.NewComponentsObj[CmpId]){
               self.NewComponentsObj[CmpId]={
                  Js_FileName:UrlP+'/'+ComponentName+'.js',
                  Html_FileName:UrlP+'/'+ComponentName+'.htm',
                  Xml_FileName:UrlP+'/'+ComponentName+'.xml',
                  CC_Filename:UrlP+'/controlchange.htm'
               }
               ++self.NewComponentsLen;
            }
            if (CmpId){
               //Component has CmpId="12"  UrlF="F1035_CMP_ADDRESS" UrlP="/frm/F1035_CMP_ADDRESS"
               self.FormComponentsIdArr.push(id);
            }
            else{
               //Facis has FId="20260"   FType="0"   SubFId="0"
               self.FormFacisIdArr.push(id);
            } 
         });
         var PkgLen=NPPkgNamesArr.length,
             PkgAndComp_cnt=0;

         //for time saving we create ViewModel when request of get PKG and CMP send to server and wait to get response
         //but it must run one time
         var IsRunCreateViewModel=false;
         function CreateViewModel(){
            $("r>n:has(d)", self.$ValidXml).attr('Opt',"1");
            //$("r>n:not([Typ])", self.$ValidXml).attr('Typ','Txt');
            //$("r>n[Typ='DLbl']", self.$ValidXml).attr('ValidExc','1').attr('RO','1');
            //$("r>n:not([Req])", self.$ValidXml).attr('Req','0');

            //md attr are show whose component feild must update by this feild
            //md child are show feild of this component must update whose feild
            //we have only md child and create md attr by this 
            var mdObj={};
            var mdChild={};
            $("r>n>md", self.$ValidXml).each(function(i,v){
               var $v=$(v),
                   id=$v.attr('PId'),
                   C=$v.attr('ChId'),
                   P=$v.parent().attr('id'),
                   md=mdObj[id];
               if (!md){
                  md='[';
               }else{
                  md=md.substr(0,md.length-1)+',';
               }
               md+='{P:"'+P+'",C:"'+C+'"}]';
               mdObj[id]=md;
               
               mdChild[P]=mdChild[P]||[];
               mdChild[P].push({PId:id,ChId:C});
            });
            $("r>n", self.$ValidXml).each(function(i,v){
               var $v=$(v),
                   id=$v.attr('id'),
                   ThisFrmFld=self.W_.FrmFld[id];
               if (ThisFrmFld)
                  return;
               ThisFrmFld=self.W_.FrmFld[id]={};
               //Enable:     '0'=Disable, '1'=Enable
               //LastEnable: '0'=Disable, '1'=Enable, '':unkonow
               ThisFrmFld=$.extend(ThisFrmFld,{
                  LastReq: null,
                  Enable:true,  LastEnable:null,
                  //hlpin:'',      Lasthlpin:'',
                  relfield:'',   Lastrelfield:'',
                  Valid:{
                     Typ: "Txt",                          
                     Nex:"",         //xml==>Nex
                     Dec: "",         //xml==>Dec
                     Req: '0',     //xml==>Req
                     Fro: "",          //xml==>Fro
                     To: "",            //xml==>To
                     Min: "",         //xml==>Min
                     Max: "",         //xml==>Max
                     Lan: "3",        //xml==>Lan: 1=farsi  ,  2=latin  ,  3=both, 255=All
                     Fil: "",         //xml==>Fil
                     Jus: "",       //xml==>Jus: R , L
                     Cap: "",      //xml==>Cap
                     Chk:'0',      //xml==>Chk
                     OnCh:"",      //xml==>OnCh
                     val:null 
                  }
               });
               var Valid_=ThisFrmFld.Valid;
               $($v[0].attributes).each(function(j,o){
                  Valid_[o.name]=o.value;
               });
               if (Valid_['Typ']=='Tmpl'){
                  self.ViewModel[id+OPTOPT] = ko.observableArray([]);
               }
               if (Valid_['Typ']=='Grd'){
                  self.W_.FrmFld_Grd[id]=ThisFrmFld;
               }
               if (Valid_['StateNo']){
                  self.W_.FrmFld_StateNo[id]=ThisFrmFld;
               }
               if ((Valid_['Typ']=='Htm')||(Valid_['Typ']=='SHtm')){
                  self.W_.FrmFld_Htm[id]=ThisFrmFld;
               }
               if (Valid_['Typ']=='PDat'){
                  self.W_.FrmFld_PDat[id]=ThisFrmFld;
               }
               if (Valid_['Typ']=='GDat'){
                  self.W_.FrmFld_GDat[id]=ThisFrmFld;
               }
               if (Valid_['Opt']=='1'){
                  var  opt=[];
                  $('d',$v).each(function(j,o){
                     var OPTValue={};
                     $.each(o.attributes, function(k, w) {
                        OPTValue[w.name]=w.value; 
                     });
                     if (!(OPTValue.val==='' && OPTValue.dsc===''))
                        opt.push(OPTValue);
                  });
                  self.ViewModel[id+OPTOPT] = ko.observableArray(opt);
               }
               
               if ((!Valid_.Max)&&(Valid_.To)){
                  Valid_.Max=Valid_.To.length;
               }
               var to,pos;
               if ((!Valid_.Dec)&&(to=Valid_.To)){
                  pos=to.indexOf('.')
                  if (pos>-1){
                     Valid_.Dec=(to.substr(pos+1).length);
                  }
               }
               ThisFrmFld.XmlNode=$v;
               ThisFrmFld['Type'] =Valid_['Typ'];
               ThisFrmFld['Help'] =Valid_['Hlp'];
               ThisFrmFld['Req']  =Valid_['Req'];
               ThisFrmFld['Act']  =Valid_['Act'];
               ThisFrmFld['Alias']=Valid_['Alias'];
               if (Valid_['Typ']=='DLbl'){
                  Valid_['ValidExc']='1';
                  Valid_['RO']='1';
               }
               var def=Valid_['Def']//$v.attr('Def'),
               if(!def)def='';
               try{
                  if (def.indexOf('(')>-1){
                     def=eval(def);
                     Valid_['Def']=def;//$v.attr('Def',def);
                  }
               }
               catch(e){
               }
               var firstdef=def;
               var idx = def.indexOf('$');
               if (idx>-1){
                  firstdef=def.substr(0,idx);
                  def='$';
                  Valid_['Def']=def;//$v.attr('Def',def);
               }
               self.ViewModel[id] = ko.observable(firstdef);
               self.ViewModel[id]
               .extend({
                     notify : 'always'
               });
               
               if(mdObj[id]){
                  //$v.attr('md',mdObj[id]);
                  Valid_['md']=mdObj[id];
                  ThisFrmFld['md']=eval(mdObj[id]);  
               }
               if (mdChild[id]){
                  ThisFrmFld['mdChild']=mdChild[id];
               }
               var Alias;
               if (Alias=Valid_['Alias']){
                  self.W_.Alias2Id[Alias]=id;
               }
               if (Valid_['MSAutoC']){
                  ThisFrmFld.Type2='MS';            
               }

               if (Valid_.Typ=='But'){                
                  var Elem=ThisFrmFld.Elem=$('#'+self.MakeFullId(id),self.W_.$bod);
                  var o={},
                      ricon=Valid_.RIcon, //$v.attr('RIcon'),
                      licon=Valid_.LIcon, //$v.attr('LIcon'),
                      label=Valid_.Label; //$v.attr('Label');
                  if(ricon || licon){
                     o.icons={};
                     if(licon)o.icons.primary = licon;
                     if(ricon)o.icons.secondary = ricon;
                  }
                  if(typeof(label) == 'undefined'){  
                     label=Elem.html();//$('#'+self.MakeFullId(id),$(e)).html();
                  }
                  if(label == ''){
                     o.text=false;
                  }
                  else{
                     o.label=label;
                  }
                  //$('#'+self.MakeFullId(id),$(e))
                  Elem
                  .npButton(o);
               }
                
               function MyFunction(att){   
                  var MyAttr=Valid_[att];//$v.attr(att);
                  if (MyAttr){
                     ThisFrmFld['np-'+att]=MyAttr;
                  }
               };
               MyFunction('OpenFaci');
               MyFunction('OnClk');
               MyFunction('OnBl');
               MyFunction('OnCh');
               var OnSubs;//$v.attr('OnSubs')
               if (OnSubs=Valid_['OnSubs']){ 
                  self.ViewModel[id]
                  .subscribe(function(NewValue){
                     self._trigger(OnSubs,null,{NewValue:NewValue, IsUsrChg:self.InternalChg_OnSubs?false:true});
                  }); 
               };

               var md=ThisFrmFld['md'];
               if (md){
                  var mdArr=md;
                  self.ViewModel[id].subscribe(function(NewValue){
                     var xml=$('r',$.parseXML('<r><outpar/></r>')),
                         outpar=$('outpar',xml);
                     $.each(mdArr,function(j,o){
                        outpar.attr(o.C,NewValue);
                        self.W_.FrmFld[o.P].WidgetSelf._XML2ViewModel(xml,{NoInternalChg_OnSubs:!self.InternalChg_OnSubs});
                        outpar.removeAttr(o.C);
                     })
                  });
               }
            });
            
         }
         var GetPkgCmpCallBack=function(status){
            if ((++PkgAndComp_cnt<PkgLen+self.NewComponentsLen)){
            }
            else{
               if (!IsRunCreateViewModel){
                  IsRunCreateViewModel=true;
                  CreateViewModel();
               }
               self.AfterGetAllPkgCmp(PreCallback,SecCallback);
            }
         };
         $.each(NPPkgNamesArr,function(i,v){
            self.GetPkg(v,GetPkgCmpCallBack);
         });
         $.each(self.NewComponentsObj,function(i,v){
            self.GetComponent(i,GetPkgCmpCallBack);
         });

         if (!IsRunCreateViewModel){
            IsRunCreateViewModel=true;
            CreateViewModel();
         }

         if (!PkgLen&&!self.NewComponentsLen){
            self.AfterGetAllPkgCmp(PreCallback,SecCallback);
            return;
         }
      },
      AfterGetAllPkgCmp:function(PreCallback,SecCallback){
         var self=this;
         var FormComponentsLen=self.FormComponentsIdArr.length,
             FormFacisLen=self.FormFacisIdArr.length,
             Cnt=0;
         if (PreCallback){
            PreCallback.call(self);
         }
         if (!FormComponentsLen&&!FormFacisLen){
            //self.CreateViewModelFinal();
            SecCallback.call(self);
            return;
         }
         var RunComponentCallBack=function(){
            ++Cnt;
            if ((Cnt<FormComponentsLen)){
               //self.CreateComponent(self.FormComponentsIdArr[FormComponentsCnt],RunComponentCallBack);
            }
            else if (Cnt-FormComponentsLen<FormFacisLen){
               self.CreateComponent(self.FormFacisIdArr[Cnt-FormComponentsLen],RunComponentCallBack);
            }
            else{
               SecCallback.call(self);
            }
         }
         //Component Create Parallel and after finish component Create Facis in serial mode
         $.each(self.FormComponentsIdArr,function(i,v){
            self.CreateComponent(v,RunComponentCallBack);
         });
         if (FormComponentsLen==0)
            self.CreateComponent(self.FormFacisIdArr[0],RunComponentCallBack);
         //self.CreateComponent(self.FormComponentsIdArr[FormComponentsCnt],RunComponentCallBack);
      },
      CreateComponent:function(ObjId, CallBack){
         var self=this,
             ThisFrmFld=self.W_.FrmFld[ObjId],
             Valid_=ThisFrmFld.Valid,
             XmlValidNode=ThisFrmFld.XmlNode,//self.W_.XmlNodes[ObjId],//$("r>n[id='"+ObjId+"']", self.$ValidXml),
             ComponentName=Valid_.UrlF,//XmlValidNode.attr('UrlF'),
             CmpId=Valid_.CmpId,//XmlValidNode.attr('CmpId'),
             formhtml,
             html_core,
             Params={};
             
         Params.ParentCmp=self;
         Params.ReadyCallBack=function(myEvent, p){
            if (p.cnt==1)
               CallBack&&CallBack.call(this,'success in Create:'+ComponentName);   
         };    

         Params.P_=Params.P_||{};
         $.each(XmlValidNode[0].attributes, function(k, w) {
            var Name=w.name,
                Val=w.value;
            if (Name.indexOf('P_')==0){
               Params.P_[Name]=Val;
            }
         });
         var myObj;
         if (!ComponentName){//Faci
            Params.IsCmp=false;
            Params.IsFaci=true;
            html_core='<div style="position:relative" id="'+self.MakeFullId(ObjId)+'_W_'+'">'+''+'</div>';
            myObj=self.$np('#'+ObjId,self.W_.$bod).html(html_core);
            Params.InlineBox=ThisFrmFld.Elem=self.$np('#'+ObjId+'_W_',myObj);
            var FType=Valid_.FType,//XmlValidNode.attr('FType'),
                FId=Valid_.FId,//XmlValidNode.attr('FId'),
                SubFId=Valid_.SubFId,//XmlValidNode.attr('SubFId'),
                inxml = $($.parseXML('<?xml version="1.0" encoding="utf-8"?><x><root><outpar/><doact/></root></x>')); 
                //outpar = inxml.find('outpar'), 
                //doact = inxml.find('doact');
            Params.ReturnCaption='';
            Params.Width = 'auto';
            Params.Height = 'auto';
            Params.inxml = inxml;
            Params.OpenInline = true;
            self.OpenNewForm(FType, FId, SubFId, Params);
            return;
         }
         else{//Component
            Params.IsCmp=true;
            Params.IsFaci=false;
            Params.CmpId=CmpId;//require to access xml validation data
            
         }
         formhtml=$.NPLocalStorage(CmpId,'HTML');//$.NPComponentsHtml[CmpId]//self.NewComponentsObj[ComponentName].Html_Source;
         //html_core=formhtml.substring(formhtml.search(/<body/i),formhtml.search(/<\/body>/i));
         //html_core=html_core.substring(html_core.search(">")+1,html_core.length);
         html_core=formhtml.substring(formhtml.indexOf('<body'),formhtml.indexOf('</body>'));
         html_core=html_core.substring(html_core.indexOf('>')+1,html_core.length);
         
         html_core=self.ReplaceParameter(Params.P_,html_core);
         
         
         html_core='<div style="position:relative" id="'+self.MakeFullId(ObjId)+'_W_'+'">'+html_core+'</div>';
         Params.AddrPath=Valid_.UrlP+'/',//XmlValidNode.attr('UrlP')+'/',
         Params.FName=ComponentName,
         Params.fname=Params.AddrPath+Params.FName;
         myObj=self.$np('#'+ObjId, self.W_.$bod).html(html_core);
         ThisFrmFld.Elem=self.$np('#'+ObjId+'_W_', myObj);
         ThisFrmFld.WidgetName=ComponentName;
         $.NPCreateWidget(ThisFrmFld.Elem, ThisFrmFld.WidgetName, Params);
         
         //$.NPGetWidget(self.$np('#'+ObjId+'_W_'),ComponentName=$(XmlValidNode).attr('UrlF')
      },
      GetComponent:function(CompId,CallBack){//(CompName,CallBack){
         var self = this,
             ThisComp;
         if (typeof CompId === "object"){
            ThisComp=CompId;
            CompId=CompId.CompId;
         }else{
            ThisComp=self.NewComponentsObj[CompId];
         }
         if (!ThisComp){
            CallBack.call(this,'no valid component');
            return;
         }
         var Js_FileName=ThisComp.Js_FileName,
             Html_FileName=ThisComp.Html_FileName,
             Xml_FileName=ThisComp.Xml_FileName,
             CC_Filename=ThisComp.CC_Filename;
         if (!Js_FileName ||!Html_FileName){
            CallBack.call(this,'no valid file names');
            return;
         }//beforesend
         if($.NPLocalStorage(CompId,'HTML')){
            // for prevent load again
            CallBack.call(this,'XML & HTML & Js was in memory');
            return;
         }
         $.ControlChangeLastModified(CC_Filename,function(NewLastModif){
            var LastModif=$.NPLocalStorage(CompId,"CC"),
                nocache=false;
            if (!LastModif||(LastModif!==NewLastModif)){
               nocache=true;
               if (!LastModif)
                  LastModif="Mon, 26 Jul 1997 05:00:00 GMT";
            }
            function GlobBeforeSend(xhr2){//, nocache2){
               if (nocache){
                  xhr2.setRequestHeader("If-Modified-Since", LastModif);
                  xhr2.setRequestHeader("Pragma", 'no-cache');
               }
            }
            var cnt=0;
            var jsdata, htmdata, xmldata;
            function GetCompelete(){
               if (++cnt<3){
               }
               else{
                  //$.NPComponentsHtml[CompId]=htmdata;
                  //$.NPComponentsXml[CompId]=xmldata;
                  $.NPLocalStorage(CompId,"HTML",htmdata);
                  $.NPLocalStorage(CompId,"XML",xmldata);//$(xmldata).xml2());
                  $.NPLocalStorage(CompId,"JS",jsdata);
                  $.NPLocalStorage(CompId,"CC",NewLastModif);
                  CallBack.call(this,'success in get:'+Js_FileName+','+Html_FileName);
               }
            }
            $.ajax({
               url : Xml_FileName,
               cache : true,
               async : true,
               dataType : "text",//xml
               beforeSend: function(xhr) {
                  GlobBeforeSend(xhr);//,nocache);
               },
               success : function(ff, textstatus) {
                  xmldata=ff;
                  GetCompelete();
               }
            });
            $.ajax({
               url : Html_FileName,
               cache : true,
               async : true,
               dataType : "text",//html
               beforeSend: function(xhr) {
                  GlobBeforeSend(xhr);//,nocache);
               },
               success : function(ff, textstatus) {
                  htmdata=ff;
                  GetCompelete();
               }
            });
            
            $.ajax({
               url : Js_FileName,
               cache : true,
               async : true,
               dataType : "text",//"script",
               beforeSend: function(xhr) {
                  GlobBeforeSend(xhr);//,nocache);
               },
               success : function(ff, textstatus) {
                  jsdata=ff;
                  GetCompelete();
               },
               error:function(jqXHR, textStatus, errorThrown){
                  CallBack.call(this,'error in get:'+Js_FileName);
               }
            });//$.ajax
         });//$.ControlChangeLastModified(function(LastM){
      },
      GetPkg:function(PkgName,CallBack){
         var self = this;
         var NPPkgObj;  
         if (!(NPPkgObj=$.NPPkgs[PkgName])||!(NPPkgObj.js)||!(NPPkgObj.css)){
            CallBack.call(this,'This Pkg is Unknown');
            return;
         }
         if (NPPkgObj.Loaded){
            CallBack.call(this,'This Pkg is Loaded Before');
            return;
         } 
         if (NPPkgObj.CallBacks){
            NPPkgObj.CallBacks.push(CallBack);
            return;
         }
         NPPkgObj.CallBacks=[];
         NPPkgObj.CallBacks.push(CallBack);
            
         var LastModifFormJs=$.NPLocalStorage(1,"FORMSJS"),
             LastModifThisPkgCss=$.NPLocalStorage(1,"PKG_CSS_"+PkgName),
             LastModifThisPkgJs=$.NPLocalStorage(1,"PKG_JS_"+PkgName),
             nocacheCss=(LastModifThisPkgCss!==LastModifFormJs),
             nocacheJs=(LastModifThisPkgJs!==LastModifFormJs);
             
         var CssLen=NPPkgObj.css.length,
             CssCnt=0; 

         $.each(NPPkgObj.css,function(j,o){
            if (!o.Loaded){ 
               self.AddStyleSheet(o.f,function(){
                  if (++CssCnt<CssLen){
                     
                  }
                  else{
                     $.NPLocalStorage(1,"PKG_CSS_"+PkgName,LastModifFormJs);
                  }
               },nocacheCss);
            }
            o.Loaded=true;
         });
          
         var JsLen=NPPkgObj.js.length,
             cnt=0;
         if (!JsLen){
            CallBack.call(this,'This Pkg hasnt any js');
            return;
         } 
         var GetJsCallBack=function(status){
            if (++cnt<JsLen){
               self.GetJs(NPPkgObj.js[cnt],GetJsCallBack,nocacheJs);
            }
            else{
               NPPkgObj.Loaded=true;
               //CallBack.call(this,'Get Pkg Compeleted');
               //var HereThis=this;
               $.each(NPPkgObj.CallBacks,function(i,v){
                  v.call(this,'Get Pkg Compeleted');
               }); 
               $.NPLocalStorage(1,"PKG_JS_"+PkgName,LastModifFormJs);
            }
         };
         self.GetJs(NPPkgObj.js[cnt],GetJsCallBack,nocacheJs); 
         //$.each(NPPkgObj.js,function(i,v){
         //   self.GetJs(v,GetJsCallBack);
         //});
      },
      GetJs:function(js,CallBack,nocacheJs){
         var status='';
         if (!js) status='no input';
         if (!js.f) status='file not defined';
         if (js.Loading) status='js in loading';
         if (js.Loaded) status='js loaded before';
         if (status){
            CallBack.call(this,status);
            return;
         }
         js.Loading=true;
         $.ajax({
            url : js.f,
            cache : true,
            async : true,
            dataType : "script",
            beforeSend: function(xhr) {
               if (nocacheJs)
                  xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
                  xhr.setRequestHeader("Pragma", 'no-cache');
            },   
            success : function(data, textstatus) {
               js.Loaded=true;
               CallBack.call(this,'success in get:'+js.f);
               //tinyMCE.execCommand('mceAddControl', true, 'textarea');
            },
            error:function(jqXHR, textStatus, errorThrown){
               js.Loading=false;
               CallBack.call(this,'error in get:'+js.f);
            }
         });//$.ajax
      },
      AddStyleSheet:function(f,CallBack,nocacheCss){
         var self=this;
         if (!nocacheCss){
            self.AddStyleSheet_Core(f);
         }
         else{
            $.ajax({
               url : f,
               cache : true,
               async : true,
               dataType : "text",
               beforeSend: function(xhr) {
                  xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
                  xhr.setRequestHeader("Pragma", 'no-cache');
               },   
               complete: function(xhr, msg){
                  self.AddStyleSheet_Core(f);
                  if (CallBack)
                     CallBack.call(this);
               }
             });
         }
         
      },
      AddStyleSheet_Core:function(f){
         if (document.createStyleSheet) {
            document.createStyleSheet(f);
         } 
         else {
            $("head").append('<link href="'+f+'" type="text/css" rel="Stylesheet" />');
         }
      },
      BeforeBinding:function(){
         
      },
      ShowACData:function(id,Params,ShowMore){
         var self = this, op = self.options, e = self.element;
         var //XmlRow=$("r>n[id='"+id+"']", self.$ValidXml),
             OnAC_Method=self.W_.FrmFld[id].Valid.OnAC,//XmlRow.attr('OnAC'),
             OnACSMC_Method=self.W_.FrmFld[id].Valid.OnACSMC;//XmlRow.attr('OnACSMC');//On AutoComplete Show More Click
             
         if (!OnAC_Method) return;
         if (ShowMore){
            Params.IsHelp=true;
            Params.MaxHlp=200;
            Params.HelpId=self.MakeFullId(id);
         }
         var CallBack=function(){
            var LastWebBusy=self.WebBusy;
            self._trigger(OnAC_Method,null,Params);
            return !LastWebBusy;
         }
         if (!ShowMore||!OnACSMC_Method){
            return CallBack.call(this)
         }
         else{
            self._trigger(OnACSMC_Method,null,{CallBack:CallBack});// developer must run p.CallBack.call(this)
         }
      },
      CreateViewModelFinal:function(){
         var self = this, op = self.options, e = self.element;
         //self._CreateViewModel();
         //_CreateViewModel:function(){
         //   var self = this,op = self.options;
         var $r=$("r", self.$ValidXml);
         self.W_.RAttrOfValidation={};
         $($r[0].attributes).each(function(j,o){
            self.W_.RAttrOfValidation[o.name]=o.value;
         });

         var $F00111= self.W_.RAttrOfValidation.MChanger;//$("r", self.$ValidXml).attr('MChanger');
         if(!$F00111)$F00111='';
         self.MChanger=$F00111;
         self.CreateHlpInOut_Act();//for fill self.Acts

         self.ViewModel['vm_bod']=self.Get$bod();
         $.each(self.W_.FrmFld,function(i,v){
            var //$v=$(v),
                id=i,//$v.attr('id'),
                databind;
            if (v.Valid.Opt
                &&(v.Valid.Opt=='1')){
                var elem=self.GetFldElem(id);//v.Elem,//self.W_.FrmFld[id].Elem,
                if(elem
                   &&(databind=elem.attr('data-bind'))
                   &&(databind.indexOf('foreach')==-1)
                   &&(databind.indexOf('attr:{')==-1)
                   &&(!elem.attr('title'))){
                      elem.attr('data-bind',databind+",attr:{title:$root.vm_ValText($data,$context,'"+id+"')}");
                }
            }
            var ActNo=v.Valid.Act;
            if (ActNo){
               var elem=self.GetFldElem(id);//v.Elem,//self.W_.FrmFld[id].Elem,
               elem.attr('np-act',ActNo);
            }
            var OnAC=v.Valid.OnAC;
            if (OnAC){
               var elem=self.GetFldElem(id);//v.Elem,//self.W_.FrmFld[id].Elem,
               var MSAutoC=v.Valid.MSAutoC;
               databind='npAutoComplete:'
                  +id//$v.attr('id')
                  +",valueUpdate:'afterkeydown',";
               if (MSAutoC){    
                  databind+='MSAutoC:'+MSAutoC+','; 
               }  
               var NPRender,ACForceSelect; 
               NPRender = v.Valid.OnACRFR;//$v.attr('OnACRFR'); 
               ACForceSelect = v.Valid.ACForceSelect//$v.attr('ACForceSelect');
               var SAC=v.Valid.SAC,//$v.attr('SAC'),
                   SingleS=v.Valid.SingleS,      //$v.attr('SingleS'),
                   Ltl=    v.Valid.Ltl,      //$v.attr('Ltl'),
                   SCol=   v.Valid.SCol,      //$v.attr('SCol'),
                   KCol=   v.Valid.KCol;      //$v.attr('KCol'); 
               databind+="ACOptions:{id:'"+id+"'"//$v.attr('id')+"'"
                  +",appendTo:vm_bod" 
                  +",rst:["+self.Acts[ActNo].rst/*rst.substr(1)*/+"]" 
                  +",csq:["+self.Acts[ActNo].csq/*csq.substr(1)*/+"]"
                  +",ActNo:'"+ActNo+"'"
                  +(SAC?",SAC:'"+SAC+"'":"") 
                  +(SingleS?",SingleS:'"+SingleS+"'":"")
                  +(SCol?",SCol:'"+SCol+"'":"")    
                  +(Ltl?",Ltl:'"+Ltl+"'":"")
                  +(KCol?",KCol:'"+KCol+"'":"")    
                  +",Method:'"+OnAC+"'"//$v.attr('OnAC')+"'"
               +(NPRender?",NPRender:"+id+"_Ren"  :  "") 
               +((ACForceSelect&&ACForceSelect=='1')?",ACForceSelect:'1'" :  "")
               +"}";
               self.ViewModel[id+"_Ren"]=op[NPRender];
               elem.attr('data-bind',databind);
            }
         });
    
         self._trigger('CreateViewModel');
         self.BeforeBinding();
         self.IsBindingInProgress=true;
         //if ($("r[DontApplyBinding='1']", self.$ValidXml).length==0)//use in F0202 for filter of report
         if(!self.W_.RAttrOfValidation.DontApplyBinding)
            ko.applyBindings(self.ViewModel,e[0]);//document.getElementById(self.ContId));
         self.IsBindingInProgress=false;
         /*self.ValidationWidget=$('<div></div>').appendTo(e).npformvalidation({
            npform:self
         });*/
         self.StartValidationCheck();
         //self.CreateInlineButtons()
         
         //$("r>n[Typ='Htm'],r>n[Typ='SHtm']", self.$ValidXml).each(function(i,v){
         $.each(self.W_.FrmFld_Htm,function(id,ThisFrmFld){
         //   var $v=$(v),
         //       id=$v.attr('id'),
            var Valid_=ThisFrmFld.Valid;
            var Typ=Valid_.Typ;//$v.attr('Typ');
            if ((Typ=='Htm')||(Typ=='SHtm')){
               var TempLang=Valid_.Lan;//$v.attr('Lan');
               if (TempLang)
                  if (Typ=='Htm'){
                     //$('#'+self.MakeFullId(id),$(e))
                     //ThisFrmFld.Elem
                     self.GetFldElem(id)
                     .each(function(ElemId,element){
                        $.data(element,'cleditor').ChangeLang(
                           (TempLang==2?'latin':((TempLang==1?'farsi':'both')))
                        );
                     });
                  }
            } 
         }); 
         $.each(self.W_.FrmFld_PDat,function(id,ThisFrmFld){
               //ThisFrmFld.Elem
               self.GetFldElem(id)
               .datepicker({ 
                  dateFormat: 'yy/mm/dd',
                  beforeShow: function (input, inst) {
                     //if (ThisFrmFld.Elem.prop("readonly"))
                     if ($(this).prop("readonly"))
                        return false;
                  }
               });//({ dateFormat: 'dd/mm/yy'});//
         });
         $.each(self.W_.FrmFld_GDat,function(id,ThisFrmFld){
               //ThisFrmFld.Elem
               self.GetFldElem(id)
               .datepicker({ 
                  dateFormat: 'yy/mm/dd',
                  calendar: Date,
                  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                  monthNamesShort: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  dayNamesShort:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  dayNamesMin:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  beforeShow: function (input, inst) {
                     //if (ThisFrmFld.Elem.prop("readonly"))
                     if ($(this).prop("readonly"))
                        return false;
                  }
               });//({ dateFormat: 'dd/mm/yy'});//
         });
         //$("r>n[Typ='Grd']", self.$ValidXml).each(function(i,v){
         //   var $v=$(v),
         //       id=$v.attr('id'),
         $.each(self.W_.FrmFld_Grd,function(id,ThisFrmFld){
            //if (Typ=='Grd'){
               var Valid_=ThisFrmFld.Valid;
               var gopt={
                  'npform':self,
                  'DefaultNoRadif':true,
                  LinePerPage:Valid_.LinePerPage,//$v.attr('LinePerPage'), 
                  ActNo:Valid_.Act,//$v.attr('Act'),
                  MaxRowId:Valid_.MaxRowId,//$v.attr('MaxRowId'),
                  //NoRowColor1:($v.attr('NoRowColor1')&&$v.attr('NoRowColor1')=='1')?true:false,
                  //NoRowColor2:($v.attr('NoRowColor2')&&$v.attr('NoRowColor2')=='1')?true:false,
                  //NoRowColor3:($v.attr('NoRowColor3')&&$v.attr('NoRowColor3')=='1')?true:false, 
                  //NoTdPadding:($v.attr('NoTdPadding')&&$v.attr('NoTdPadding')=='1')?true:false, 
                  //NoShowHeader:($v.attr('NoShowHeader')&&$v.attr('NoShowHeader')=='1')?true:false
                  NoRowColor1:(Valid_.NoRowColor1&&Valid_.NoRowColor1=='1')?true:false,
                  NoRowColor2:(Valid_.NoRowColor2&&Valid_.NoRowColor2=='1')?true:false,
                  NoRowColor3:(Valid_.NoRowColor3&&Valid_.NoRowColor3=='1')?true:false, 
                  NoTdPadding:(Valid_.NoTdPadding&&Valid_.NoTdPadding=='1')?true:false, 
                  NoShowHeader:(Valid_.NoShowHeader&&Valid_.NoShowHeader=='1')?true:false
                  },
                  m=null,
                  allmodes=null,  
                  sw,mnodeid,mnodedf;
               if(sw=Valid_.Switch){//$v.attr('Switch')){
                  m = m || {};
                  m['Switch']=sw;
               }
               $('mode',ThisFrmFld.XmlNode)//$(v))
                  .each(function(mindex,mnode){
                  m = m || {};
                  m['All'] = m['All'] || [];
                  var ma=m['All'][mindex] ={};
                  if(mnodeid=$(mnode).attr('id')) 
                     ma['Mode']=mnodeid;
                  ma['ModeXml']=$(mnode);
                  if (mnodedf=$(mnode).attr('DisableF')) 
                     ma['DisableF']=mnodedf.split(",");
               });
               if(m){
                  gopt['Modes']=m;
               }
               //self.CreateNPGrid(v,gopt,self.W_.FrmFld[id].Elem);
               self.CreateNPGrid(ThisFrmFld.XmlNode,gopt,self.GetFldElem(id));//ThisFrmFld.Elem);
            //}
         });
         var CmpState=self.W_.RAttrOfValidation.CmpState;//$("r", self.$ValidXml).attr('CmpState');
         if (CmpState){
            self.CmpStateId=CmpState;
            self.CmpStateVal=self.ViewModel[CmpState]();
            self.ViewModel[CmpState]
            .subscribe(function(NewValue) {
               self.CmpStateVal=NewValue?NewValue:'';
               $('[np-state-no^="'+CmpState+'"]',self.W_.$bod).each(
                  function(i,v){
                     var $v=$(v),
                         StateNo=$v.attr('np-state-no'),
                         CommaStateNo=StateNo.indexOf(',');
                     //CmpStateId=$v.attr('np-state-id');
                     if ((CommaStateNo>-1)&&(StateNo=StateNo.substr(CommaStateNo+1))&&(!isNaN(StateNo))){
                        StateNo=parseInt(StateNo)-1;
                        var StateAction=self.CmpStateVal[StateNo];
                        (StateAction&&StateAction=='3')&&$v.hide();
                        (StateAction&&StateAction=='4')&&$v.show();
                     }
                  }
               );
               self.InitFrm_Core(); 
            });
         }
         if (self.MChanger){
            self.FMod = self.ViewModel[self.MChanger]();
            self.ViewModel[self.MChanger]
            .extend({ notify: '' })
            .subscribe(function(NewValue) {
               self.FMod_Changed();
            });
            self.FMod_Changed();
         }
         else{
            self.FMod = 0;
         }
         self._trigger('AfterLoad');      
         var NoAct00=self.InParam&&($('doact',self.InParam).attr('act00')=='0');
         var TempDoAct=self.InParam&&$('doact',self.InParam).attr('act');
         if (!NoAct00){
            NoAct00=self.W_.RAttrOfValidation.Act00=='0';//$("r", self.$ValidXml).attr('Act00')=='0';
         }

         if (!NoAct00){
            self.CloseWaitingDialog();
            self.DoAct('00',null,false);
            return;
         }
         var Params={NoAct00:true,ErLen:0};
         self.ActNo=Params.ActNo='00';

         Params.ErLen=self.ErLen=0;
         //vaghti act00 nadarim chetori usrlvl ra begirim
         //Params.UserLvl=(($("oaut", $(self.Resp)).length&&$("oaut", $(self.Resp)).attr('usrlvl'))
         //          ?$("oaut", $(self.Resp)).attr('usrlvl'):0);
         //if (self.UserLvl==0){//if (act=='00'){
         //   self.UserLvl=Params.UserLvl;
         //}


         
         self.Get_Data_Core(0, Params);

         /*self._SetNextAct(self.ActNo, 0);
         self._SetShowBtn();
         self.InitFrm();
         
         if (self.ParentCmp&&(self.ReadyCallBack_cnt==0)){
            ++self.ReadyCallBack_cnt;
            self._trigger('ReadyCallBack',null,{cnt:self.ReadyCallBack_cnt});
         }*/

         self._XML2ViewModel(self.InParam);
         if (TempDoAct){
            self.CloseWaitingDialog();
            self.DoAct(TempDoAct,null,false);
            return;
         }
         self.CloseWaitingDialog();
      },
      
      MakeFullId:function(id){
         return this.ContId+id;
      },
      MakeOrgId:function(id){
         return id.substring(this.ContId.length,id.length);
      },
      CreateWaitingDialog:function(){
         var self=this,
             op=self.options;
         if (op.ParentCmp) return;
         self.WaitDialog=$('<div style="padding:3px;position:absolute;display:none" class="ui-state-error ui-corner-all np-waiting-text" />')
                 .append($('<img />').prop('src',npImages[0].src))
                 .append('<nobr> لطفا صبر كنيد</nobr>')
                 .appendTo(self.W_.$bod);
         self.WaitingOverlay=$('<div class="np-correct-overlay"></div>').prependTo(self.W_.$bod).hide();
         self.W_.WaitingDialogArr=[];
      },
      OpenWaitingDialog:function(p){
         var self=this,
             op=self.options,
             e=self.element;
         //self.WaitDialog.npDialog("open");
         //self.WaitDialog.parent().parent().prepend('<div class="np-correct-overlay"></div>');
         if (op.ParentCmp) return;
         p=p||{};
         var NewParam={}, ZIndex;
         NewParam.ShowText=!p.NoText;
         NewParam.ShowOverlay=!p.NoOverlay;
         var LastParam=self.W_.WaitingDialogArr.length?self.W_.WaitingDialogArr[self.W_.WaitingDialogArr.length-1]:{};
         self.W_.WaitingDialogArr.push(NewParam);
         if ((NewParam.ShowText&& !LastParam.ShowText)||(NewParam.ShowOverlay&& !LastParam.ShowOverlay)){
            ZIndex=
            //$(':visible',self.W_.$bod)
            self.W_.$bod.children(':visible')
            .map(function(){
               var x=+$( this ).css("z-index");
               return isNaN(x)?0:x;
            }).get();
            ZIndex = Math.max.apply(null, ZIndex)||1;
            
         }
         //if (!p.NoText){
         if (NewParam.ShowText&& !LastParam.ShowText){
            self.WaitDialog.show();
            self.WaitDialog.css('z-index',ZIndex+2);
            self.WaitDialog.position({
               my:'center center',
               at:'center center',
               of:e
            });
         };
         //if (!p.NoDisable){
            //self.W_.$bod.prop('disabled',true);
         //};
         //if (!p.NoOverlay&&self.WaitingOverlay.css('display')=='none'){
         if (NewParam.ShowOverlay&& !LastParam.ShowOverlay){
            self.WaitingOverlay.show();
            self.WaitingOverlay.css('z-index',ZIndex+1);               
            self.WaitDialog.position({
               my:'center center',
               at:'center center',
               of:self.WaitingOverlay
            });
         };
      },
      CloseWaitingDialog:function(){
         var self=this,
             op=self.options;
         //self.WaitDialog.npDialog("close");
         //self.WaitDialog.parent().parent().find('.np-correct-overlay').remove();
         if (op.ParentCmp) return;
         var NewParam;
         NewParam=self.W_.WaitingDialogArr.length?self.W_.WaitingDialogArr.pop():{};
         var LastParam=self.W_.WaitingDialogArr.length?self.W_.WaitingDialogArr[self.W_.WaitingDialogArr.length-1]:{};
         
         if (!LastParam.ShowText){
            self.WaitDialog.hide();
         }
         if (!LastParam.ShowOverlay){
            self.WaitingOverlay.hide();
         }
         //self.W_.$bod.prop('disabled',false);
      },
      $np:function(param1,param2){ 
         var TempParam=param1,
            SharpPos,
            TempElemID;
         SharpPos=TempParam.indexOf("#");
         if (SharpPos>=0){
            TempElemID=TempParam.substring(SharpPos+1,TempParam.length);
            TempParam=TempParam.substring(0,SharpPos)+'#'+this.MakeFullId(TempElemID);
         }
         return $(TempParam,param2);
      },
      GetCmpSelf:function(Cmp){
         var self=this;
         //var Elem=self.W_.FrmFld[Cmp].Elem;
         return self.W_.FrmFld[Cmp].WidgetSelf;//$.NPGetWidget(Elem);   
      },
      Xml2Obj:function(xml){
         var R={}
         $.each(xml[0].attributes,function(i,v){
            R[v.name]=v.value;
         });
         return R;
      },
      Obj2AutXML:function(aut){
         var R=$('<aut/>');
         $.each(aut,function(id,val){
            R.attr(id,val);
         });
         return R;
      },
      _Init_SndXML:function(myParam){
         var self = this,
             op=self.options,
             Type=myParam?(myParam.Type||''):'';
         if (Type=='nav'){
            self._SndNavXML = null;
            if (NavJSON){
               if (self.IsJSON){
                  self._SndNavXML ={aut:$.extend({},self.AutXml().aut)};
               }else{
                  self._SndNavXML ={aut:$.extend({},self.Xml2Obj($('aut',self.AutXml())))};
               }
            }else{
               self._SndNavXML = $(   $.parseXML('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><srv xmlns="urn:nowpardaz"><root><x><r /></x></root></srv>  </soap:Body></soap:Envelope>'));
               var aut=self.IsJSON?self.Obj2AutXML(self.AutXml().aut):$('aut',self.AutXml()).clone();
               aut.appendTo($('x',self._SndNavXML));
            }
         }
         else if (Type=='logout'){
            self._SndNavXML = null;
            self._SndNavXML = $(   $.parseXML('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><srv xmlns="urn:nowpardaz"><root><x><r /></x></root></srv>  </soap:Body></soap:Envelope>'));
            $('aut',self.AutXml()).clone().appendTo($('x',self._SndNavXML));
         }
         else{
            self._SndXML = null;
            if (self.IsJSON){
               self._SndXML ={aut:$.extend({},self.AutXml().aut)};
            }else{
               self._SndXML =    $(   $.parseXML('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><srv xmlns="urn:nowpardaz"><root><x><r /></x></root></srv>  </soap:Body></soap:Envelope>'));
               $('aut',self.AutXml()).clone().appendTo($('x',self._SndXML));
            }
         }
      },
      SetAutByResp:function(Resp){
         var self=this, op=self.options;
         if (op.IsCmp&&op.ParentCmp){
            return op.ParentCmp.SetAutByResp(Resp);
         }
         if (op.UseOpenerAut){
            return op.OpenerSelf.SetAutByResp(Resp);
         } 
         var IsJSON=op.CmpId&&(CmpByJSON.indexOf(op.CmpId)>-1);
         if (IsJSON){
            self.AutXml().aut=null;
            delete self.AutXml().aut;
            self.AutXml().aut=Resp.aut
            //var Aut=$('aut',Resp)
            //self.AutXml().aut=self.Xml2Obj(Aut)//Resp.aut;
         }else{
            $('aut',self.AutXml()).remove();
            self.AutXml().append($('aut',Resp));//.clone());
         }
      },
      AutXml:function(){
         var self=this, op=self.options;   
         if (op.IsCmp&&op.ParentCmp){
            return op.ParentCmp.AutXml();
         }
         if (op.UseOpenerAut){
            return op.OpenerSelf.AutXml();
         } 
         return self.Aut;         
      },
      SetTckByResp:function(FatherTicket){
         var self=this, op=self.options;
         if (op.IsCmp&&op.ParentCmp){
            return op.ParentCmp.SetTckByResp(FatherTicket);
         }
         if (op.UseOpenerAut){
            return op.OpenerSelf.SetTckByResp(FatherTicket);
         } 
         var IsJSON=op.CmpId&&(CmpByJSON.indexOf(op.CmpId)>-1);
         if (IsJSON){
            self.AutXml().aut.tck=FatherTicket;
         }else{
            $('aut',self.AutXml()).attr('tck',FatherTicket);
         }
         
      },
      GetAut:function(p){   
         var self = this;
         //<aut u="20119" ft="0" f="15930" seq="21858" subfrm="0" su="0" lt="FACEE4AC-94D4-45" tck="435D600A-C8A5-4A" ut="2" actsign="1" sid="53jdzeeyyx3eoa0xhqxxpmhw"/>
         var s='',a;
         if(p){
            a=[p];
         } 
         else{
            a=['u','ft','f','seq','subfrm','su','lt','tck','ut','actsign','sid'];
         }
         $.each(a, function(i,v) {
           //s=s+'  '+$('aut',$(self.Resp)).attr(v);
           s=s+'  '+$('aut',self.AutXml()).attr(v);
         });
         return s.substr(2);
      },
      PassValueToParent:function(PId,NewValue){
         var self=this;
         if (self.Val(PId)!==NewValue)
            self.Val(PId,NewValue);
      },
      SetRelationChildToParent:function(ChId,PId){
         var self=this, op=self.options;
         if (!self.W_.FrmFld[ChId].dm){//dm: detail to master
            self.W_.FrmFld[ChId].dm=[];
            self.ViewModel[ChId].subscribe(function(NewValue){
               $.each(self.W_.FrmFld[ChId].dm,function(i,v){
                  op.ParentCmp.PassValueToParent(v,NewValue);//(PId,NewValue);
               });
            });
         }
         self.W_.FrmFld[ChId].dm.push(PId);
      },
      GetHlpIn:function(HlpId,HlpArrId,HlpArrType,HlpArrElem){
         var self=this, op=self.options;
         HlpArrId.push(self.MakeFullId(HlpId));
         HlpArrType.push(self.W_.FrmFld[HlpId].Type);
         if (HlpArrElem){
            var Elem=self.GetFldElem(HlpId),
                WidgetElem=self.GetFldWidgetElem(HlpId),
                Type;
                //1:Elem is ready but Widget Elem is not ready
                //2:Final Elem is Ready
            if (Elem){
               Type=2;
               if(!WidgetElem){
                  Type=1;
                  WidgetElem=Elem
               }
               HlpArrElem.push({Elem:WidgetElem,Type:Type});
            }
         }
         var dm=self.W_.FrmFld[HlpId].dm
         dm&&$.each(dm,function(i,v){
            var RelFieldINParent=op.ParentCmp.MakeFullId(v);
            if (HlpArrId.indexOf(RelFieldINParent)==-1){
               op.ParentCmp.GetHlpIn(v,HlpArrId,HlpArrType,HlpArrElem);
            }
         });
         var md=self.W_.FrmFld[HlpId].md
         md&&$.each(md,function(j,o){
            var RelFieldINChild=self.GetCmpSelf(o.P).MakeFullId(o.C);
            if (HlpArrId.indexOf(RelFieldINChild)==-1){
               self.GetCmpSelf(o.P).GetHlpIn(o.C,HlpArrId,HlpArrType,HlpArrElem);
            }
         });
      },
      _SetShowBtn:function(){
         var self = this,op = self.options, e = self.element;
         //$(':input[type="button"].'+NPCommanderButtonClass,self.dvfrmFooter).hide();
         $('button.'+NPCommanderButtonClass,self.W_.$dvfrmFooter).hide();
         var AllHide=true;
         $("r>com>modimg[id='"+self.FMod+"']>img", self.$ValidXml).each(function(i,v){
            var $v=$(v),
                ImgId=$v.attr('id');
            if (ImgId){
               $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).npButton( "disable" );
               $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).show();
               AllHide=false;
               var BtnCap=$v.attr('text');
               if (BtnCap){
                  //$('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).val(BtnCap);
                  $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).npButton('option','label',BtnCap);
               }
               var RIconName=$v.attr('RIcon'),LIconName=$(v).attr('LIcon'),o={};
               if (RIconName || LIconName){
                    if(RIconName)o.primary=RIconName;
                    if(LIconName)o.secondary=LIconName;
                  $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).npButton('option','icons',o);
               }      
            }
         });
         if (AllHide&&!$('button:visible',self.W_.$dvfrmFooter).length){
            self.W_.$dvfrmFooter.hide();
         }
         else{
            self.W_.$dvfrmFooter.show();
         }
         //self.ResizeHandler();
      },
      Reset:function(firsttime){
         var self = this, op = self.options, e = self.element;
         var LastActNo=self.ActNo;
         if (!firsttime){
            self.ActNo='00';
            self._SetShowBtn();
            self._SetNextAct(self.ActNo,0);
            self.ResizeHandler();
         }         
         self.IsBindingInProgress=true;
         self.InternalChg_OnSubs=true;
         //$("r>n", self.$ValidXml).each(function(i,v){
         $.each(self.W_.FrmFld,function(i,v){
            var //$v=$(v),
                id=i,//$v.attr('id'),
                Typ=v.Valid.Typ,//$v.attr('Typ'),
                def=v.Valid.Def;//$v.attr('Def');
            if (typeof def== 'undefined')
               def='';
            switch (Typ){
               case 'Cmp':{
                  var Elem=self.GetFldElem(id);//v.Elem;//self.W_.FrmFld[id].Elem;
                  if(def!='$'){
                     if (!firsttime)
                        //$.NPGetWidget(Elem)
                        v.WidgetSelf.Reset(firsttime);
                     self.Val(id,def);
                  }
                  break;
               }
               case 'Grd':{   
                  //def=$v.attr('Def');
                  if(LastActNo!=='00') //(self.ActNo!=='00')
                  if(def!='$'){
                     //v.Elem
                     self.GetFldElem(id).npgrid('refresh','<Root/>');//$('#'+self.MakeFullId(id)).npgrid('refresh','<Root/>');
                     //self.ViewModel[id+'RId']("");
                  }
                  break;
               }
               default:{
                  if(def!='$'){
                     self.Val(id,def);
                  }
               }
            }
         }) ;
         self.InternalChg_OnSubs=false;
         self.IsBindingInProgress=false;
      },
      ResetClick:function(){//شروع مجدد
         var self = this;
         self._ShowErrorBox(self.EmptyMessage,false,true);
         self.Reset();
         self.InitFrm();
         return;
      }, // end of ResetClick()
      Get_Data_Core:function(HelpId, Params){
         var self=this, op = self.options
         self.Get_Data(HelpId, Params);
         if (op.ParentCmp&&!self.WebBusy&&(self.ReadyCallBack_cnt==0)){//if in Get_Data00 Run DoAct so WebBusy Set true and in Second Get_Data Call ReadyCallBack for tell to parent that this component is ready 
            ++self.ReadyCallBack_cnt;
            self._trigger('ReadyCallBack',null,{cnt:self.ReadyCallBack_cnt});
         }
      },
      DoAct:function(act,HelpId,/*ishelp,*/Params){
         var self=this;
         var op = self.options, e = self.element;
         /*if ((ishelp!==null)&&(typeof(ishelp)=='object')){
            Params=ishelp;
            ishelp=Params.IsHelp?true:false;
         }*/
         Params=Params||{};
         //Params.IsHelp=ishelp;
         var IsJSON=(op.CmpId&&(CmpByJSON.indexOf(op.CmpId)>-1))?true:false;
         if (self.WebBusy){
            if (Params&&!Params.AutoComplete){
               self._ShowErrorBox(
                  //$($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg><error>امکان اجرای درخواست جدید قبل از اتمام کار درخواست قبلی وجود ندارد</error></msg>'))
                  //IsJSON?
                  {msg:{errors:['امکان اجرای درخواست جدید قبل از اتمام کار درخواست قبلی وجود ندارد'],war:[],suc:[]}}
                  //:$('<root><msg><error>امکان اجرای درخواست جدید قبل از اتمام کار درخواست قبلی وجود ندارد</error></msg></root>')
                  ,true
                  ,true
               );
            }
            return false;
         }
         var IsHelp=$("r>com>act[id='"+act+"']", self.$ValidXml).attr('help');
         if (IsHelp&&IsHelp=='1')
            Params.IsHelp=true;
         if (!self.ParallelActCnt&&(act!=='00'))
            self._ShowErrorBox(self.EmptyMessage,false,true);
         self.ActNo=act;//mohem ast. agar 00 bashad dar get data self.Reset ra ejra mikonim
         self._Init_SndXML({CmpId:op.CmpId});
         if (!self._ViewModel2XML(act, Params.MaxHlp)){
            return false;
         }
         /*if (Params.NoRunAjax) 
            return true;//use in F0202 at doact('09')
         */   
          
         self.WebBusy=true;
         self.ParallelActCnt++;
         //var a=$('aut',self._SndXML);
         self.url=op.fname+".svc";//self.url=op.fname+".asmx";
         if (Params.AutoComplete){
            self.OpenWaitingDialog({NoText:true,NoDisable:true,NoOverlay:true});
         }
         else{
            self.OpenWaitingDialog({NoOverlay:true});
         }
         var ajaxdata;
         if (self.IsJSON){
            ajaxdata=JSON.stringify(self._SndXML);
         }else{
            ajaxdata=self._SndXML.xml2();
         }
         $.ajax({
            type: "POST",
            url: self.url+(IsJSON?"/go":""),
            dataType: IsJSON?"json":"xml",
            contentType:  IsJSON?"application/json; charset=utf-8":'text/xml; charset=utf-8',
            processData: false,
            async: true, //false,
            data: ajaxdata,
            beforeSend: function(xhr) {
               //xhr.setRequestHeader("SOAPAction", "urn:nowpardaz/srv");
               (!IsJSON)&&xhr.setRequestHeader("SOAPAction", "urn:nowpardaz/NPService/srv"); 
            },
            complete: function(xhr, msg){
               self.ParallelActCnt--;
               self.WebBusy=false;
               //self.W_.$bod.prop('disabled',false);
               if(msg == 'success'){
                  self.Resp=null;
                  //IsJSON=false;
                  if (IsJSON)
                     self.Resp=JSON.parse(xhr.responseText);
                  else
                     self.Resp=$($.parseXML(xhr.responseText));
                  if (act=='00'){
                     if ($('outpar',self.InParam).length){
                        self._XML2ViewModel(self.InParam);
                     } 
                  }
                  //var Params=Params||{};
                  Params=Params||{};
                  self.ActNo=Params.ActNo=act;
                  //Params.ErLen=IsJSON?self.Resp.msg.error.length:$("error", self.Resp).length;
                  Params.ErLen=IsJSON?self.Resp.msg.errors.length:$("error", self.Resp).length;
                  self.ErLen=Params.ErLen;
                  Params.UserLvl=
                     IsJSON?(self.Resp.oaut&&self.Resp.oaut.usrlvl?self.Resp.oaut.usrlvl:0):
                     ((($("oaut", self.Resp).length&&$("oaut", self.Resp).attr('usrlvl'))?$("oaut", self.Resp).attr('usrlvl'):0));
                  if (self.UserLvl==0){//if (act=='00'){
                     self.UserLvl=Params.UserLvl;
                  }
                  self.SetAutByResp(self.Resp);
                  
                  self.Get_Data_Core(HelpId, Params);
               }
               var TempDoAct
               if((msg == 'success')&&(act=='00')&&$('doact',self.InParam).length&&(TempDoAct=$('doact',self.InParam).attr('act'))){
                  self.CloseWaitingDialog();
                  self.DoAct(TempDoAct,null,false);
               }
               else{
                  self.CloseWaitingDialog();
               }
            },
            error: function(xhr, msg, et) {
               this._errMsg = xhr.responseText;
               alert('this._errMsg');
               alert(this._errMsg);
            }
         });//$.ajax
      },
      _SetNextAct:function(lact,ErLen){
         //important: if this act has not next act, variable of NextAct don't change
         //         so act='00' must have next act 
         var self=this,e = self.element;
         if (ErLen>0){
            //self.NextAct=lact;
         }
         else{
            var SetDefaultsForNextAct=true;
            //$("r>com>modact[id='"+self.FMod+"']>act[id='"+lact+"']", self.$ValidXml).each(function(i,v){
            $("r>com>act[id='"+lact+"']>mod[id='"+self.FMod+"']", self.$ValidXml).each(function(i,v){
               var nex=$(v).attr('nex');
               if (nex){
                  self.NextAct=nex;   
                  SetDefaultsForNextAct=false;
               }
            });
            if (SetDefaultsForNextAct && (["00","08","01"].indexOf(lact)!=-1)){
               ////////////////defaults
               if (lact=='00')self.NextAct="00";
               if (lact=='00'){
                  if($("r>com>modimg[id="+self.FMod+"]>img[id='IM08']", self.$ValidXml).length){
                     self.NextAct="08";
                     return;
                  }
               }
               if(lact=='00' || lact=='08'){
                  if($("r>com>modimg[id="+self.FMod+"]>img[id='IM01']", self.$ValidXml).length){
                     self.NextAct="01";
                     return;
                  }
               }
               $("r>com>modimg[id="+self.FMod+"]>img[id^='IM0']", self.$ValidXml).each(function(i,v){
                  var s_id=$(v).attr("id").substr(2,2);
                  if(['02','03','04','09'].indexOf(s_id)>=0)
                     self.NextAct=s_id;
               });
            }
         }
      }, 
      _RemoveReqStar:function(OrgId,Type){
         var self=this;
         var TempElem=self.W_.FrmFld[OrgId].Elem;
         if (self.W_.FrmFld[OrgId].Type2&&(self.W_.FrmFld[OrgId].Type2=='MS')){
            TempElem.npAutoComplete('Require',false);  
            return;
         }
         if (Type=="Htm"){
            TempElem.each(function(i,element){
               $.data(element,'cleditor').NpSetReq(false);   
            });
            return;
         }
         if (Type=="SHtm"){
            TempElem.npeditor('Require',false);
            return;
         }
         var ElemReqStar=self.W_.FrmFld[OrgId].ElemReqStar;
         if (ElemReqStar){
            ElemReqStar.hide();
         }
         //var par=TempElem.parent();
         //if (par.is('span')&&par.hasClass('npRquire')){
         //   TempElem.parent().replaceWith(TempElem);
         //}
      },
      _AddReqStar:function(OrgId,Type){
         var self=this;
         var TempElem=self.W_.FrmFld[OrgId].Elem;
         if (self.W_.FrmFld[OrgId].Type2&&(self.W_.FrmFld[OrgId].Type2=='MS')){
            TempElem.npAutoComplete('Require',true);
            return;
         }
         if (Type=="Htm"){
            TempElem.each(function(i,element){
               $.data(element,'cleditor').NpSetReq(true);   
            });
            return;
         }
         if (Type=="SHtm"){
            TempElem.npeditor('Require',true);
            return;
         }

         var ElemReqPar=self.W_.FrmFld[OrgId].ElemReqPar;
         var ElemReqStar=self.W_.FrmFld[OrgId].ElemReqStar;
         if (!self.W_.FrmFld[OrgId].ElemReqIsLabel){
            self.W_.FrmFld[OrgId].ElemReqIsLabel=TempElem.is('label')?'1':'0';
         }
         if (self.W_.FrmFld[OrgId].ElemReqIsLabel==1)
            return;
         //var par=TempElem.parent();
         if (!ElemReqPar){
            if (self.W_.FrmFld[OrgId].Valid['OnAC']&&!self.W_.FrmFld[OrgId].Valid['MSAutoC']){
               ElemReqPar=self.W_.FrmFld[OrgId].ElemReqPar=TempElem.parent().wrap('<SPAN class="npRquire"></SPAN>').parent();
            }
            else{
               ElemReqPar=self.W_.FrmFld[OrgId].ElemReqPar=TempElem.wrap('<SPAN class="npRquire"></SPAN>').parent();
            }
            ElemReqStar=self.W_.FrmFld[OrgId].ElemReqStar=$('<SPAN class="npRquire ui-state-hover">*</SPAN>').appendTo(ElemReqPar);
         }
         else{
            ElemReqStar.show();
         }
         //if (!(par.is('span')&&par.hasClass('npRquire'))){
         //   TempElem.wrap('<SPAN class="npRquire"></SPAN>')
         //      .after('<SPAN class="npRquire ui-state-hover">*</SPAN>');
         //}
            
      },
      EnableField:function(OrgId,SetEnable,OthrAtt){
         var self=this,e = self.element,
             TempElem,TempElemHelp,Help,Req,Type;
         if($.isArray(OrgId)){
            $(OrgId).each(function(i,v) {
               self.EnableField(v,SetEnable,OthrAtt);
            });
            return;
         }
         /*TempElem=$('#'+self.MakeFullId(OrgId),self.W_.$bod);
         if (!OthrAtt){
            Req=null;
            Help=null;
            $("r>n[id='"+OrgId+"']", self.$ValidXml).each(function(i,v){
               Req=$(v).attr('Req');
               Help=$(v).attr('Hlp');//$(v).attr('Help');               
               Type=$(v).attr('Typ');//$(v).attr('Help');               
            });//$("r>n[id='"+OrgId+"']", self.$ValidXml).each(function(i,v){
         }else{
            Help=OthrAtt.Help;
            Req=OthrAtt.Req;
            Type=OthrAtt.Type;
         }*/
         TempElem=self.W_.FrmFld[OrgId].Elem;
         if (!TempElem) return;
         var ThisFrmFld=self.W_.FrmFld[OrgId]
         Help=ThisFrmFld.Help;
         Req=ThisFrmFld.Req;
         Type=ThisFrmFld.Type;
         ThisFrmFld.LastEnable=SetEnable;
         ThisFrmFld.LastReq=Req;
         var myTagName=TempElem.prop("tagName");
         if (myTagName&&(myTagName.toUpperCase()=='DIV')){
            Req=0;
            if (!SetEnable){
               $('input',TempElem).blur().prop("disabled",!SetEnable);
            }
            else{
               $('input',TempElem).prop("disabled",!SetEnable);
            }
            SetEnable?$('input',TempElem).removeClass('ui-state-disabled'):$('input',TempElem).addClass('ui-state-disabled');
         }
         else if(Type=='Htm'){
            //TempElem.prop("disabled",!SetEnable);
            TempElem.each(function(i,element){
               $.data(element,'cleditor').disable(!SetEnable);    
            });
         }
         else if(Type=='SHtm'){
            SetEnable?TempElem.npeditor('enable'):TempElem.npeditor('disable');
         }
         else if (ThisFrmFld.Valid['OnAC']){
            SetEnable?TempElem.npAutoComplete('enable'):TempElem.npAutoComplete('disable');
         }
         else if(TempElem.is('input') /*|| $(TempElem).is('textarea')*/){
           // TempElem.prop("disabled",!SetEnable);
           //SetEnable?TempElem.removeClass('ui-state-disabled'):TempElem.addClass('ui-state-disabled');
            TempElem.prop("readonly",!SetEnable);
            SetEnable?TempElem.removeClass('np-state-readonly'):TempElem.addClass('np-state-readonly');
         } 
         else{
            if (TempElem.is('button')){
               TempElem.toggleClass( "ui-state-disabled", !SetEnable );
            }
            else if (TempElem.is('select')){
               TempElem.prop("readonly",!SetEnable);
               ThisFrmFld.Val=self.ViewModel[OrgId]();//self.Val(OrgId);
               SetEnable?TempElem.removeClass('np-state-readonly'):TempElem.addClass('np-state-readonly'); 
            }
            else{
               //TempElem.prop("disabled",!SetEnable);
               TempElem.toggleClass( "ui-state-disabled", !SetEnable );
            }
         }
         //if ((Help)&&(Help!=='No')){
         if ((Help)&&(self.W_.FrmFld[Help])&&(TempElemHelp=self.W_.FrmFld[Help].Elem)){
            self.W_.FrmFld[Help].LastEnable=SetEnable;
            self.W_.FrmFld[Help].LastReq=Req;
            if (!SetEnable){
               //$('#'+self.MakeFullId(Help),self.W_.$bod)
               TempElemHelp
                  .blur()
                  .addClass('ui-button-disabled ui-state-disabled')
                  //.prop("disabled",!SetEnable);
            }
            else{
               //$('#'+self.MakeFullId(Help),self.W_.$bod)
               TempElemHelp
                  .removeClass('ui-button-disabled ui-state-disabled')
                  //.prop("disabled",!SetEnable);
            }
         }
         if (!SetEnable){
            self._RemoveReqStar(OrgId,Type);
         }
         else{
            if ((Req)&&(Req==1)){
               self._AddReqStar(OrgId,Type);
            }
         }
         if ((Type=='HLnk')||(myTagName&&myTagName.toUpperCase()==='BUTTON')||(myTagName&&myTagName.toUpperCase()==='LABEL')){
            if (SetEnable){
               TempElem.removeClass('ui-button-disabled ui-state-disabled');
            }
            else{
               TempElem.addClass('ui-button-disabled ui-state-disabled');
            }
         }
         return TempElem;
      },
      CreateHlpInOut_Act:function(){
         var self=this,e = self.element;
         self.Acts={};
         var ActXml=$('r>com>act[id]',self.$ValidXml);
         ActXml.each(function(i,v){
            var $v=$(v),
                ActId=$v.attr('id'),
                //hlpin='[',
                relfield='[';
            self.Acts[ActId]={HlpArrElem:[]};
            if ($('hlpin',v).length){
               var HlpArrId=[], HlpArrType=[];    
               $('hlpin>f',v).each(function(j,o){
                  var HlpId=$(o).attr('id');
                  self.GetHlpIn(HlpId,HlpArrId,HlpArrType,self.Acts[ActId].HlpArrElem);   
               });
               //$.each(HlpArrId,function(j,o){
               //   if (['Cmp','_Var'].indexOf(HlpArrType[j])==-1){
               //      //for prevent big hlpin remove components va variables
               //      hlpin+='"'+o+'"'+',';
               //   }
               //});
            }
            //if (hlpin.length>1){
            //   hlpin=hlpin.substr(0,hlpin.length-1);
            //}
            //hlpin=hlpin+']';
            
            var rst='',csq='';
            if ($('relfield',v).length){
               $('relfield>f',v).each(function(j,o){
                  var $o=$(o),
                      col=$o.attr('Col')?$o.attr('Col'):$o.attr('data'),
                      id=$o.attr('id');
                  relfield+='["'+id+'","'+col+'"],';
                  rst+=",'"+id+"'";
                  csq+=",'"+(parseInt(col)-1).toString()+"'";
               });   
            }
            if (relfield.length>1){
               relfield=relfield.substr(0,relfield.length-1);
            }
            relfield=relfield+']';
            //self.Acts[ActId]=$.extend(self.Acts[ActId],{hlpin:hlpin, relfield:relfield, 
            //                  rst:rst.substr(1), csq:csq.substr(1)});
            self.Acts[ActId].relfield=relfield;
            self.Acts[ActId].rst=rst.substr(1);
            self.Acts[ActId].csq=csq.substr(1);
         });
      },
      CreateHlpInOut:function(OnlySaveToFrmFld){
         var self=this,e = self.element;
         self.CreateHlpInOut_Act();
         //$("r>n[Act]", self.$ValidXml).each(function(i,v){
         //$("r>n:has(hlpin)", self.$ValidXml)
         //.add($("r>n:has(relfield)", self.$ValidXml))
         //.add($("r>n>d>n:has(hlpin)", self.$ValidXml))
         //.add($("r>n>d>n:has(relfield)", self.$ValidXml))
         
         /*$("r>n[Act]", self.$ValidXml)
         .add($("r>n>d>n[Act]", self.$ValidXml))
         .each(function(i,v){
            var $v=$(v),
                ActId=$v.attr('Act'),
                OrgHlpId=$v.attr('id'),
                HlpElem,hlpin,relfield;
            if (OnlySaveToFrmFld){
               self.W_.FrmFld[OrgHlpId].hlpin=self.Acts[ActId].hlpin;
               self.W_.FrmFld[OrgHlpId].relfield=self.Acts[ActId].relfield;
            }
            else{
               HlpElem=$('#'+self.MakeFullId(OrgHlpId),self.W_.$bod);
               HlpElem.attr('hlpin',self.Acts[ActId].hlpin);
               HlpElem.attr('relfield',self.Acts[ActId].relfield);
            }
         });*/
      },
      CommitEnableF:function(){
         var self=this,e = self.element;
            //$.NPGetWidget(self.$np('#'+ObjId+'_W_'),ComponentName=$(XmlValidNode).attr('UrlF')
         
         $.each(self.W_.FrmFld,function(i,ThisFrmFld){
            if (ThisFrmFld.Type=='Cmp'){
               //$.NPGetWidget(ThisFrmFld.Elem)
               ThisFrmFld.WidgetSelf.ComponentReq=ThisFrmFld.Req;
               if (ThisFrmFld.Enable){
                  //$.NPGetWidget(ThisFrmFld.Elem)
                  ThisFrmFld.WidgetSelf.EnableAllField=true;
                  //$.NPGetWidget(ThisFrmFld.Elem)
                  ThisFrmFld.WidgetSelf.InitFrm_Core();//InitFrm();
               }
               else{
                  //$.NPGetWidget(ThisFrmFld.Elem)
                  ThisFrmFld.WidgetSelf.EnableAllField=false;
                  //$.NPGetWidget(ThisFrmFld.Elem)
                  ThisFrmFld.WidgetSelf.InitFrm_Core();//new
                  //$.NPGetWidget(ThisFrmFld.Elem).DisableAllField();
               }
            }
            else{
               if ((ThisFrmFld.Enable!=ThisFrmFld.LastEnable)||(ThisFrmFld.Req!=ThisFrmFld.LastReq))
                  self.EnableField(i,ThisFrmFld.Enable);
            }
            /*if (v.hlpin!=v.Lasthlpin){
               v.Elem.attr('hlpin',v.hlpin);
               v.Lasthlpin=v.hlpin;               
            }
            if (v.relfield!=v.Lastrelfield){
               v.Elem.attr('relfield',v.relfield);
               v.Lastrelfield=v.relfield;               
            }*/
         });
      },
      /*DisableAllField:function(){
         var self=this,e = self.element;
         var TempElem,FirstElem;
         //self.CreateHlpInOut(true);
         //disable all field in this form and pass Help id of this field to function to add diable class od buttons
         $("r>n[ValidExc!='1']", self.$ValidXml).each(function(i,v){
            var id=$(v).attr('id'),
               Help=$(v).attr('Hlp'),//$(v).attr('Help'),
               Req=$(v).attr('Req'),
               Type=$(v).attr('Typ');
            if (!Help){
               Help='No';
            }
            if (id){
               //self.EnableField(id,false,{Help:Help,Req:Req,Type:Type});
               self.W_.FrmFld[id].Enable=false;
               if (self.W_.FrmFld[id].Help&&self.W_.FrmFld[self.W_.FrmFld[id].Help])
                 self.W_.FrmFld[self.W_.FrmFld[id].Help].Enable=false;
            }
         });
         self.CommitEnableF();
      },*/
      InitFrm:function(DontFocus){
         var self=this,e = self.element;
         var FirstElem=self.InitFrm_Core();
         
         // focus to first element
         if (FirstElem&&!DontFocus){
            var FirstElemId=FirstElem.attr('id');
            var FirstElemLastId=FirstElem.attr('orgid');
            if (FirstElemId){
               self.NPSetFocus(FirstElemId,FirstElemLastId,true,false);
            }
         }

      },
      SelectFirstElem:function(){
          var self=this,e = self.element;
        
         var FirstElem=null;
         //$("r>com>modact[id='"+self.FMod+"']>act[id='"+self.NextAct+"']>f", self.$ValidXml).each(function(i,v){
         $("r>com>act[id='"+self.NextAct+"']>mod[id='"+self.FMod+"']>f", self.$ValidXml).each(function(i,v){
            var id=$(v).attr('id'),vv;
            if (id){
               if (!FirstElem&&self.W_.FrmFld[id].Enable){
                  if ((vv=self.W_.FrmFld[id])&&(vv.Type)&&(vv.Type=='Cmp')){
                     FirstElem=//$.NPGetWidget(vv.Elem)
                                 vv.WidgetSelf.SelectFirstElem();
                  }
                  else{
                     var myTagName=self.W_.FrmFld[id].Elem?self.W_.FrmFld[id].Elem.prop("tagName"):'';
                     if ((myTagName)&&(myTagName.toUpperCase()!=='DIV'))
                        FirstElem=self.W_.FrmFld[id].Elem;
                  }                                 
                  if (FirstElem)
                     return false;// for end each loop
               }
            }
         });
         return FirstElem;
      },
      InitFrm_Core:function(){
         var self=this,e = self.element, op=self.options;
         var TempElem,FirstElem=null,
             ComponentReq=self.ComponentReq;
         self.CreateHlpInOut(true);
         //disable all field in this form and pass Help id of this field to function to add diable class od buttons
         //$("r>n[ValidExc!='1']", self.$ValidXml).each(function(i,v){
         $.each(self.W_.FrmFld,function(i,v){
            var //$v=$(v),
                id=i,//$v.attr('id'),
                Help=v.Valid.Hlp//$v.attr('Hlp'),
                Req=v.Valid.Req||'0';//$v.attr('Req')||'0';
            if (id&&!v.Valid.ValidExc){
               if (!Help){
                  Help='No';
               }
               v.Enable=false;//self.W_.FrmFld[id].Enable=false;
               v.Req=Req;//self.W_.FrmFld[id].Req=Req;
               //if (self.W_.FrmFld[id].Help&&self.W_.FrmFld[self.W_.FrmFld[id].Help])
               //  self.W_.FrmFld[self.W_.FrmFld[id].Help].Enable=false;
               if (v.Help&&self.W_.FrmFld[v.Help])
                 self.W_.FrmFld[v.Help].Enable=false;
            }
         });
         //});
         //enable fields that must enable in this mod (their help enable by EnableField function automatically)
         if (!op.ParentCmp||self.EnableAllField)
         //$("r>com>modact[id='"+self.FMod+"']>act[id='"+self.NextAct+"']>f", self.$ValidXml).each(function(i,v){
         $("r>com>act[id='"+self.NextAct+"']>mod[id='"+self.FMod+"']>f", self.$ValidXml).each(function(i,v){
            var $v=$(v),
                id=$v.attr('id'),
                Req=$v.attr('Req');
            if (id){
               if (ComponentReq&&ComponentReq=='0') Req='0';
               if (Req) self.W_.FrmFld[id].Req=Req;
               self.W_.FrmFld[id].Enable=true;
               if (self.W_.FrmFld[id].Help&&self.W_.FrmFld[self.W_.FrmFld[id].Help])
                  self.W_.FrmFld[self.W_.FrmFld[id].Help].Enable=true;
            }
         });
         $.each(self.W_.FrmFld_Grd,function(id,ThisFrmFld){
         //$("r>n[Typ='Grd']", self.$ValidXml).each(function(i, v) {
         //   var $v=$(v),
         //       id=$v.attr('id');
            if (ThisFrmFld.Valid.Typ=='Grd'){
               var SwitchId=ThisFrmFld.Valid.Switch,//$v.attr('Switch'),
                   SwitchVal, DisableF;
               if (SwitchId) SwitchVal=self.Val(SwitchId);
               if (SwitchVal)
                  DisableF=$('mode[id="'+SwitchVal+'"]',ThisFrmFld.XmlNode)//$v)
                     .attr('DisableF');
               if (DisableF){
                  $.each(DisableF.split(','),function(j,o){
                     self.W_.FrmFld[o].Enable=false;
                     if (self.W_.FrmFld[o].Help)
                       self.W_.FrmFld[self.W_.FrmFld[o].Help].Enable=false;
                  });
               }
            }
         });
         
         $.each(self.W_.FrmFld_StateNo,function(id,ThisFrmFld){
         //$("r>n[StateNo]", self.$ValidXml).each(function(i, v) {
         //   var $v=$(v),
         //       id=$v.attr('id'),
            var StateNo=ThisFrmFld.Valid.StateNo;//$v.attr('StateNo');
            if (id&&StateNo&&!isNaN(StateNo)){
               StateNo=parseInt(StateNo)-1;
               var StateAction=self.CmpStateVal[StateNo];
               (StateAction&&StateAction=='1')&&(self.W_.FrmFld[id].Enable=false);
            }
         //});
         })
          
         self.CommitEnableF();
         
         if (!op.ParentCmp||self.EnableAllField)
            FirstElem=self.SelectFirstElem();
         
         if (!op.ParentCmp){
            if ($("r>com>modimg[id='"+self.FMod+"']>img>act", self.$ValidXml).length==0){
               //set img enable by defaults
               $('#'+self.MakeFullId("IM99"),self.W_.$dvfrmFooter).npButton( "enable" );            
               if (self.NextAct=="01"){
                  $('#'+self.MakeFullId("IM01"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM02"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM03"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM04"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM09"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
               if (self.NextAct=="02"){
                  $('#'+self.MakeFullId("IM01"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM02"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM09"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
               if (self.NextAct=="03"){
                  $('#'+self.MakeFullId("IM01"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM03"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM09"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
               if (self.NextAct=="04"){
                  $('#'+self.MakeFullId("IM01"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM04"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM09"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
               if (self.NextAct=="09"){
                  $('#'+self.MakeFullId("IM01"),self.W_.$dvfrmFooter).npButton( "enable" );            
                  $('#'+self.MakeFullId("IM09"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
               if (self.NextAct=="08"){
                  $('#'+self.MakeFullId("IM08"),self.W_.$dvfrmFooter).npButton( "enable" );            
               }
            }
            else{
               //set img enable by xml data
               $("r>com>modimg[id='"+self.FMod+"']>img", self.$ValidXml).each(function(i,v){
                  var ImgId=$(v).attr('id'); //get id of image
                  if (ImgId){
                     if ($("act[id='"+self.NextAct+"']",v).length>0){
                        $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).npButton( "enable" );
                     }
                     else{
                        $('#'+self.MakeFullId(ImgId),self.W_.$dvfrmFooter).npButton( "disable" );
                     }
                  } 
               });
            }
         }
         return FirstElem;
           
      },
      FMod_Changed:function(){
         var self=this;
         if (self.MChanger){
            //self.FMod = self.ViewModel.F00111();
            self.FMod = self.ViewModel[self.MChanger]();
         }
         else{
            self.FMod =0;
         }
         self._SetShowBtn();
         self._SetNextAct('00',0);
         self.InitFrm();
         self.ResizeHandler();
         /*$("r>n[Typ='Grd']", self.$ValidXml).each(function(i, v) {
            id=$(v).attr('id');
            self.$np('#'+id).npgrid('DsblKey');
         });*/ 
         
      },
      Get$bod:function(){
         var self=this, op = self.options;
         if (op.ParentCmp){
            return op.ParentCmp.Get$bod();
         } 
         if (op.OpenerSelf&&op.OpenInDialog){
            return op.OpenerSelf.Get$bod();
         }
         else{
            //return self.W_.$bod.parent();
            return self.W_.$bod;
         }
      },
      parent$bod:function(){
         var self=this, op = self.options;
         return self.Get$bod().parent();
      },
      //Get_Data:function(HEvent,ishelp,Params){
      Get_Data:function(HelpId, Params) {
         Params = Params || {};
         var self = this, e = self.element, op = self.options, 
             ishelp = Params.IsHelp;
         if(self.ActNo == "00" && !op.CmpId)
         { 
            var USRTYPE = $('aut',self.AutXml()).attr('ut');
            GlobViewModel.vm_UserType(USRTYPE == 0 ? "دانشجو" : (USRTYPE == 1 ? "استاد" : (USRTYPE == 2 ? "مدير" : (USRTYPE == 5 ? "داوطلب آزمون" : ""))));
            var oaut = $('oaut', self.Resp);
            if($("oaut", self.Resp).attr('cchg') == 'true'){
               $("#ChangeStatus").button();
               GlobViewModel.SettingsDiv.css("height","100px");
               $("#utype").css("padding-top","10px").show()
            }
            else{
               $("#utype").hide()
            }
            if (oaut.attr('usrnam') || oaut.attr('usrfam')) {
               GlobViewModel.vm_UsrNamFam(oaut.attr('usrnam') + ' ' + oaut.attr('usrfam'));
            }
            if (oaut.attr('llogin')) {
              GlobViewModel.vm_LastLogin(oaut.attr('llogin'))
            }
            var rhead = $("oaut", self.Resp).attr('rhead');
            if (rhead) {
               GlobViewModel.vm_rhead(rhead);
            }
            $("#Exit").button();
            self._on("#Exit",{
               'click':function() {
                  self.OnClickExit();
               }
            });
            self._on("#ChangeStatus",{
               'click':function() {
                  var self2=GlobViewModel.OpenedSelf||self;
                  self2.CallDoAct_Logout(function(Resp){
                     GlobViewModel.vm_UserType($('outpar',Resp).attr('F4877DSC'));
                     $("aut", self2.AutXml()).attr('ut',$('outpar',Resp).attr('F4877'));
                  },'18');
               return false;
               }
               
            });
            self._on(GlobViewModel.SettingsDiv,{
               'click':function() {
                  GlobViewModel.SettingsDiv.fadeToggle('200');   
            }});
            var SettingBox = GlobViewModel.SettingsIcon.closest("table");
            self._on(SettingBox,{
               'click':function() {
                  GlobViewModel.SettingsDiv.fadeToggle('200');
                  GlobViewModel.SettingsDiv.css('left',GlobViewModel.SettingsIcon.position().left);  
                  if($("#dvHeader").css("display") != "none")
                     GlobViewModel.SettingsDiv.css('top','65px');
                  else
                     GlobViewModel.SettingsDiv.css('top','28px'); 
               }
            });       
         }
         if ((HelpId !== null) && ( typeof (HelpId) == 'object')) {
            HelpId = HelpId && HelpId.currentTarget && HelpId.currentTarget.id ? HelpId.currentTarget.id : '';
         }
         if (!HelpId&&Params.HelpId){
            HelpId=Params.HelpId;//for bishtar of autocompelete
         }
         //Params.ErLen = $("error", $(self.Resp)).length;
         //Params.UserLvl = (($("oaut", $(self.Resp)).length && $("oaut", $(self.Resp)).attr('usrlvl')) ? $("oaut", $(self.Resp)).attr('usrlvl') : 0);
         var DontFocus=false,
             LastNextAct=self.NextAct;
         self._SetNextAct(Params.ActNo, self.ErLen);
         if (LastNextAct==self.NextAct)
            DontFocus=true;
         //if (Params.ActNo !== '00')
         if (!(Params && (Params.AutoComplete||Params.IsHelp))){
            //($("r>com>act[id='"+ Params.ActNo+"'][help='1']", self.$ValidXml).length>0)))
            self._SetShowBtn();
            self.InitFrm(DontFocus);
            self.ResizeHandler();
         }
       
         if (Params.NoAct00)
            return;
         self._XML2ViewModel(self.Resp);
         self._ShowErrorBox(self.Resp,true,self.IsJSON);
         if (Params && Params.AutoComplete) {
            if (Params.Get_Data_AC)    
               Params.Get_Data_AC(self._Grd[0]);
         } 
         else if (ishelp ){
            if(self.ErLen == 0){
               //$("r>n[id='"+self.MakeOrgId(HEvent.currentTarget.id)+"']", self.$ValidXml).each(function(i,v){
               var ii, vv, cnt = 0;
               if(HelpId){
                  //$("r>n[id='" + self.MakeOrgId(HelpId) + "']", self.$ValidXml)
                  //.each(function(i, v) {
                  //   ii = i;
                  //   vv = v;
                  //   cnt++;
                  //});
                  vv=self.W_.FrmFld[self.MakeOrgId(HelpId)].XmlNode;
               };   
               if (false){
                  $(vv).attr('NoPaging','1');
               }
               if (self.HelpDialogs['ACT'+Params.ActNo]){ // if dialoge is opened
                  self.HelpGrids['ACT'+Params.ActNo].npgrid('refresh', self._Grd[0].dat);
                  self.HelpGrids['ACT'+Params.ActNo].npgrid('option', 'MaxRow', self._Grd[0].MaxRow);
                  self.HelpGrids['ACT'+Params.ActNo].npgrid('option', 'UpDat', self._Grd[0].UpDat);
                  self.HelpDialogs['ACT'+Params.ActNo]
                     .npDialog('option', 'title',  self._Grd[0].tit)
                     .npDialog('moveToTop');
                  self._Grd = [];
                  return;
               }
               self.HelpDialogs['ACT'+Params.ActNo]= $('<div />');
               //var HelpDialog = $('<div />');
               //var $d = 
              
               var ColStart = 1, AftFilRowInternal;  
               if (Params.MSAutoC_npform){//&&(Params.SingleS_npform=='0')){
                  ColStart = 0; // از ستون شماره 0 شروع کن
                  self._Grd[0].col=  '<col width = "20px">' + self._Grd[0].col ;
                  self._Grd[0].th =  '<th>انتخاب</th>' + self._Grd[0].th; // یک ستون به ابتدای گرید اضافه میشود
                  self._Grd[0].ColAttr['CheckBox0']=Params.SingleS_npform=='0'?'1':'2'; //1:CHECKBOX   2: RADIO
                  var KCol=$(vv).attr('KCol')||"C1,C2";
                  if (KCol.indexOf(",") == -1){
                     KCol = "C1,C2";  
                  }  
                  KCol = KCol.split(",");
                  var Index_VAL = KCol[0].split("C")[1];  
                  var Index_DSC = KCol[1].split("C")[1];   
                  AftFilRowInternal=function (myEvent,p) {       
                     //var FirstTd=$('td:first',p.Element).prepend('<input type="checkbox"/>');  
                     //var NodeId = p.Data.Td()[Index_VAL].Val;
                     //var CheckBox=$('input:first',FirstTd).attr("value",NodeId).attr("id",NodeId);
                     //if ($('row[VAL="'+NodeId+'"]',Params.MSAutoC()).length){                        
                     //   CheckBox.prop('checked',true);
                     //} 
                  }
               }
               self.HelpGrids['ACT'+Params.ActNo]=$('<table><colgroup>' + self._Grd[0].col + '</colgroup><thead><TR>' + self._Grd[0].th + '</TR></thead><tbody><tr><td>&nbsp;</td></tr></tbody></table>')
                  .appendTo(self.Get$bod());
                  //.appendTo(self.parent$bod());
               var NPGridOptions = {
                  CheckBox_Index_VAL: Index_VAL,
                  CheckBox_Index_DSC:Index_DSC,
                  CheckBox_MS: Params.MSAutoC_npform,
                  CheckBox_SS: Params.SingleS_npform,
                  DoActParams : Params,
                  //MSAutoC: Params.MSAutoC,
                  npform : self,
                  ActNo : Params.ActNo,
                  MaxRow : self._Grd[0].MaxRow,
                  UpDat : self._Grd[0].UpDat,
                  InXML : self._Grd[0].dat,
                  GridCursor : 'pointer',
                  ColFirstNo : ColStart,   
                  RowNodeName : 'row',
                  ColPrefix : 'C',
                  width : $(window).width() / 2, 
                  height : $(window).height() / 2,
                  DefaultCloseDialog : true,
                  DefaultNoRadif : true,
                  HelpDialog : self.HelpDialogs['ACT'+Params.ActNo],
                  ColAttr : self._Grd[0].ColAttr,
                  LinePerPage : $(vv).attr('LinePerPage'),
                  AftFilRowInternal: AftFilRowInternal
               };  
               self.CreateNPGrid(vv, NPGridOptions, self.HelpGrids['ACT'+Params.ActNo]);//$d);
               //HelpDialog
               self.HelpDialogs['ACT'+Params.ActNo]
               .addClass("np-dialog-nopad-noscroll")    
               .appendTo(self.Get$bod())//self.W_.$bod)
               //.appendTo(self.parent$bod())//self.W_.$bod)
               .append(self.HelpGrids['ACT'+Params.ActNo].npgrid('Container'))//$d.npgrid('Container'))
               .npDialog({
                  appendTo : self.Get$bod(),//self.W_.$bod, 
                  //appendTo : self.parent$bod(),//self.W_.$bod, 
                  width : $(self.HelpGrids['ACT'+Params.ActNo].npgrid('Container')).outerWidth(true),
                  //resizable: false,
                  title : self._Grd[0].tit, //'راهنماي دانشکده',
                  beforeClose : function() {  
                  },
                  open: function(){
                     var x;   
                  },
                  close : function() {  
                     self.HelpGrids['ACT'+Params.ActNo].remove();
                     //self.HelpGrids['ACT'+Params.ActNo]=null;
                     delete self.HelpGrids['ACT'+Params.ActNo];
                     self.HelpDialogs['ACT'+Params.ActNo].remove();
                     //self.HelpDialogs['ACT'+Params.ActNo]=null;
                     delete self.HelpDialogs['ACT'+Params.ActNo];
                     //$d.npgrid('destroy');
                     //HelpDialog.npDialog('destroy');
                  },
                  resize:function( event, ui ){
                     var Dialog = $(this).parent(),
                         TitleBarHeight = $('.ui-dialog-titlebar',Dialog) ? $('.ui-dialog-titlebar',Dialog).outerHeight() : 30,
                         h = ui.size.height-TitleBarHeight,
                         w = ui.size.width;
                     self.HelpGrids['ACT'+Params.ActNo]
                     .npgrid('option','width',w)
                     .npgrid('option','height',h)
                     .npgrid('ReCalcDim',w,h);
                  }
               })//.npDialog(
               .npDialog("option", "position",{ my: "center", at: "center", of:self.Get$bod()}); //window });
            }//(self.ErLen == 0){
         }//if (ishelp){
         else if (self._Grd.length > 0) {//there is some grids in received data
            $(self._Grd).each(function(i, v) {
               var thisGrd=$('#' + self.MakeFullId(v.id)), 
                   RId=thisGrd.npgrid('option','RId'),
                   GrdRId;
               if (RId){
                  GrdRId=self.Val(RId);
               }
               thisGrd.npgrid('refresh', v.dat,GrdRId);
               var MaxRowId=self.W_.FrmFld[v.id].Valid['MaxRowId'];
               if (MaxRowId){
                  var MaxRow=self.Val(MaxRowId);
                  thisGrd.npgrid('option', 'MaxRow', MaxRow);
               }
               //$('#' + self.MakeFullId(v.id)).npgrid('refresh', v.dat, self.ViewModel[v.id+'RId']());
            });
         }
         self._Grd = [];
      },
      _ShowErrorBox:function(data, AppendToResponse, ForceParseJSON){
         var self=this,e = self.element, op=self.options;
         if (op.ParentCmp){
            self=op.ParentCmp;
            while(self.options.ParentCmp){
               self=self.options.ParentCmp;
            }
            return self._ShowErrorBox(data, AppendToResponse, ForceParseJSON);
         }
         var IsJSON=ForceParseJSON;//||self.IsJSON;
         var $data=data,//$(data),
             $Msgs=IsJSON?$data.msg:$("msg", $data);
         if ((!AppendToResponse)||(!self.W_.$Msgs)){
            self.W_.$Msgs={errors:[],war:[],suc:[]};//IsJSON?$data.msg:$("msg", $data).clone();
         }
         //else{
            
            if(IsJSON){
               $.each($Msgs.errors,function(i,v){self.W_.$Msgs.errors.push(v);});
               $.each($Msgs.war   ,function(i,v){self.W_.$Msgs.war.push(v);});
               $.each($Msgs.suc   ,function(i,v){self.W_.$Msgs.suc.push(v);});
            }else{
               $('error',$Msgs).each(function(i,v){
                  self.W_.$Msgs.errors.push($(v).html());
               });
               $('war',$Msgs).each(function(i,v){
                  self.W_.$Msgs.war.push($(v).html());
               });
               $('suc',$Msgs).each(function(i,v){
                  self.W_.$Msgs.suc.push($(v).html());
               });
               //self.W_.$Msgs
               //.append($('error',$Msgs).clone())
               //.append($('war',$Msgs).clone())
               //.append($('suc',$Msgs).clone());
            }
         //}
         //self.$data=$data;
         IsJSON=true;
         $Msgs=self.W_.$Msgs;
         var //$Msgs=$("msg", self.$data),
             $Error=  IsJSON?$Msgs.errors:$('error',$Msgs),
             $Warning=IsJSON?$Msgs.war   :$('war',$Msgs),
             $Suc=    IsJSON?$Msgs.suc   :$('suc',$Msgs),
             s='';
         /*if (self.W_.$MessageButton.attr('nplasttitle')){
            self.W_.$MessageButton
            .tooltip('destroy')
            .attr('nplasttitle','')
            .attr('title','');
         }*/
         self.W_.$MessageButton.attr('title','');
         if (($Error.length==0)&&($Warning.length==0)&&($Suc.length==0)){
            var LastHideParam=self.W_.$MessageDialog.npDialog('option','hide');
            var LaseBeforeCloseParam=self.W_.$MessageDialog.npDialog('option','beforeClose');
            self.W_.$MessageDialog.npDialog('option','hide',null);
            self.W_.$MessageDialog.npDialog('option','beforeClose',null);
            self.W_.$MessageDialog.npDialog('close');
            self.W_.$MessageDialog.npDialog('option','hide',LastHideParam);
            self.W_.$MessageDialog.npDialog('option','beforeClose',LaseBeforeCloseParam);
            self.W_.$MessageButton
               .prop('checked',false)
               .npButton('refresh');
         }
         var ShowHeaderButton=
            (($Error.length==$Error.length+$Warning.length+$Suc.length)||
            ($Warning.length==$Error.length+$Warning.length+$Suc.length)||
            ($Suc.length==$Error.length+$Warning.length+$Suc.length))
            ?false:true; 
            
         self.W_.$MsgDlgErrBut.npButton('widget').css('display',ShowHeaderButton&&$Error.length?'':'none');
         self.W_.$MsgDlgWarBut.npButton('widget').css('display',ShowHeaderButton&&$Warning.length?'':'none');
         self.W_.$MsgDlgSucBut.npButton('widget').css('display',ShowHeaderButton&&$Suc.length?'':'none');

         self.W_.$MsgDlgErrBut
            .prop('checked',$Error.length?true:false)
            .npButton('refresh')
            .npButton('option','label',$Error.length+' '+$ErrorMessageText);         
         self.W_.$MsgDlgWarBut
            .prop('checked',$Warning.length?true:false)
            .npButton('refresh')
            .npButton('option','label',$Warning.length+' '+$WarningMessageText);         
         self.W_.$MsgDlgSucBut
            .prop('checked',$Suc.length?true:false)
            .npButton('refresh')
            .npButton('option','label',$Suc.length+' '+$SucMessageText);         
         //if (($Error.length==0)&&($Warning.length==0)&&($Suc.length==0)){
         //   return;
         //}
         self.W_.$MessageBodyDialog
            .find('div')
            .remove();
         var w=100;
         var TempMessage;
         var BubbleMessage='';
         if (IsJSON){
            function AddMessage(MsgArr,MessageType,MessageClass){
               $.each(MsgArr,function(i,v){
                  var TempPos;
                  if ((TempPos=v.indexOf('::AutoLogOff()'))>-1)
                     v=v.substr(0,TempPos);
                  BubbleMessage+=v+'<br>';
                  TempMessage=self.W_.$MessageBodyDialog.find('div[npmessagetype="'+MessageType+'"]');
                  if (TempMessage.length>0){
                     TempMessage.html(TempMessage.html()+'<br>'+v.textContent);
                  }else{
                     TempMessage=$('<div npmessagetype="'+MessageType+'" class="'+MessageClass+'" style="display:inline">'+v+'</div>');
                     self.W_.$MessageBodyDialog.prepend(TempMessage);
                     if (TempMessage.css('width')>w) w=TempMessage.css('width');
                     TempMessage.css('display','');
                  }
               })
            };
            AddMessage($Msgs.errors,$ErrorMessageType,$ErrorMessageClass)
            AddMessage($Msgs.war,$WarningMessageType,$WarningMessageClass)
            AddMessage($Msgs.suc,$SucMessageType,$SucMessageClass)
         }else{
            $Msgs.children().each(function(i,v){
               var TempPos;
               if ((TempPos=v.textContent.indexOf('::AutoLogOff()'))>-1)
                  v.textContent=v.textContent.substr(0,TempPos);
               switch (v.tagName){
                  case 'error':{
                     //BubbleMessage+='<Span class="'+$ErrorMessageType+'">'+v.textContent+'</span>';
                     BubbleMessage+=v.textContent+'<br>';
                     TempMessage=self.W_.$MessageBodyDialog.find('div[npmessagetype="'+$ErrorMessageType+'"]');
                     if (TempMessage.length>0){
                        TempMessage.html(TempMessage.html()+'<br>'+v.textContent);
                        break;   
                     }
                     TempMessage=$('<div npmessagetype="'+$ErrorMessageType+'" class="'+$ErrorMessageClass+'" style="display:inline">'+v.textContent+'</div>');
                     self.W_.$MessageBodyDialog.prepend(TempMessage);
                     if (TempMessage.css('width')>w) w=TempMessage.css('width');
                     TempMessage.css('display','');
                     break;
                  }
                  case 'war':{
                     //BubbleMessage+='<Span class="'+$WarningMessageClass+'">'+v.textContent+'</span>';
                     BubbleMessage+=v.textContent+'<br>';
                     TempMessage=self.W_.$MessageBodyDialog.find('div[npmessagetype="'+$WarningMessageType+'"]');
                     if (TempMessage.length>0){
                        TempMessage.html(TempMessage.html()+'<br>'+v.textContent);
                        break;   
                     }
                     TempMessage=$('<div npmessagetype="'+$WarningMessageType+'" class="'+$WarningMessageClass+'">'+v.textContent+'</div>');
                     self.W_.$MessageBodyDialog.prepend(TempMessage);
                     if (TempMessage.css('width')>w) w=TempMessage.css('width');
                     TempMessage.css('display','');
                     break;
                  }
                  case 'suc':{
                     //BubbleMessage+='<Span class="'+$SucMessageClass+'">'+v.textContent+'</span>';
                     BubbleMessage+=v.textContent+'<br>';
                     TempMessage=self.W_.$MessageBodyDialog.find('div[npmessagetype="'+$SucMessageType+'"]');
                     if (TempMessage.length>0){
                        TempMessage.html(TempMessage.html()+'<br>'+v.textContent);
                        break;   
                     }
                     TempMessage=$('<div npmessagetype="'+$SucMessageType+'" class="'+$SucMessageClass+'">'+v.textContent+'</div>');
                     self.W_.$MessageBodyDialog.prepend(TempMessage);
                     if (TempMessage.css('width')>w) w=TempMessage.css('width');
                     TempMessage.css('display','');
                     break;
                  }
               }
               TempMessage=null;
            });
         }
         if (self.CloseMessageDialogTimer){
            clearTimeout(self.CloseMessageDialogTimer);   
            self.CloseMessageDialogTimer=null;     
         }      
         var w=self.W_.$bod.width()*0.8;
         self.W_.$MessageDialog.npDialog("option", "position", { my: "center center", at: "center center", of: self.W_.$bod } );
         if ((($Error.length)||($Warning.length)||($Suc.length))){//||($Forms.length))
            //self.W_.$MessageDialog.npDialog('open');
            //self.W_.$MessageButton
            //   .prop('checked',true)
            //   .npButton('refresh');                
            var h=self.W_.$MessageBodyDialog.height()+self.W_.$MessageHeaderDialog.height()+100;
            if (h>self.W_.$bod.height()*0.8){
               h=self.W_.$bod.height()*0.8;
            }
            self.W_.$MessageDialog.npDialog("option",'width',w);
            self.W_.$MessageDialog.npDialog("option",'height',h);
            self.W_.$MessageButton
            .attr('title',BubbleMessage);
            
            if (($Error.length==0)&&($Warning.length==0)&&($Suc.length==1)){
               self.W_.$MessageButton//.attr('title',$Suc.text())
               .tooltip('open');
               self.CloseMessageDialogTimer=
               setTimeout(function(){
                  self.W_.$MessageButton.tooltip("close");
                  self.CloseMessageDialogTimer=null;
               },3000);
            }
            else{
               self.W_.$MessageDialog.npDialog('open');
               self.W_.$MessageButton
                  .prop('checked',true)
                  .npButton('refresh');                
            }
         }
         s='';
         s+=($Error.length?$Error.length+' '+$ErrorMessageText+'-':'');             
         s+=($Warning.length?$Warning.length+' '+$WarningMessageText+'-':'');             
         s+=($Suc.length?$Suc.length+' '+$SucMessageText+'-':'');
         if (s.length){
            s=s.substr(0,s.length-1);
         }             
         if (($Error.length)||($Warning.length)||($Suc.length)
         ){
            self.W_.$MessageButton
            .npButton("option", "label", s)
            .npButton("widget")
            .show();
         }
         else{
            self.W_.$MessageButton
            .tooltip('close')//;
            //self.W_.$MessageButton
            .npButton("option", "label", 'بدون پيغام')
            .npButton("widget")
            .hide();

         }
         self.ResizeHandler();
      },
      //  این تابع  اطلاعات گرفته شده  از سرور به شکل ایکس ام ال را گرفته و  در ابجکت مربوط به فرم قرار می دهد
      _XML2ViewModel:function(data,Params){//SetInParam, DontStopSubscribe){
         var self = this,op=self.options, e = self.element;
         var vformated;
         var IsJSON=op.CmpId&&(CmpByJSON.indexOf(op.CmpId)>-1);
         var SetInParam=Params?Params.SetInParam:false,
             NoInternalChg_OnSubs=Params?Params.NoInternalChg_OnSubs:false;
         var id,val,ColAttr={},ColAttrVal;
         if (NoInternalChg_OnSubs){
            self.InternalChg_OnSubs=false;
         }
         else{
            self.InternalChg_OnSubs=true;
         }
         if(IsJSON){ 
            $.each(data.rset.grd,function(i,v){
               var $v=$(v.xml),
                   id=$v.attr('id');
               var tit=null,a,$dat=$('dat',$v),s1='',s2='',$titrow=$('tit>row',$v);
               try{
                  a=$('tit>row',$v);
                  if(a.length>0){
                     tit=a.attr('IDTITLE');
                     for(var j=1;j<=a.attr('IDNUMBERCOL');j++){
                        s1+='<col width = "'+a.attr('IDWIDTH'+(j))+'px">';
                        s2+='<th>'+a.attr('IDCOLUMN'+(j))+'</th>';
                        ColAttrVal=a.attr('ALIGN'+(j));
                        if (ColAttrVal){
                           ColAttr['ALIGN'+(j)]=ColAttrVal;
                           ColAttr['DIR'+(j)]=ColAttrVal.toUpperCase()=='LEFT'?'ltr':'rtl';
                        } 
                        ColAttrVal=a.attr('COLTYPE'+(j));
                        if (ColAttrVal){
                           ColAttr['COLTYPE'+(j)]=ColAttrVal;
                        }
                     }
                  }
               }
               catch(e){
               }
               self._Grd.push({id:id,tit:tit,col:s1,th:s2,dat:$dat,titrow:$titrow,ColAttr:ColAttr,
                  MaxRow:$v.attr('MaxRow'),UpDat:$v.attr('UpDat')
               });

               /*var $v=v,
                   id=Value.id;
               var tit=null,a,$dat=Value.dat,s1='',s2='',$titrow=Value.tit.row;
               try{
                  a=Value.tit.row;
                  if(a.length>0){
                     tit=a.IDTITLE;
                     for(var j=1;j<=a.IDNUMBERCOL;j++){
                        s1+='<col width = "'+a.IDWIDTH+j+'px">';
                        s2+='<th>'+a.IDCOLUMN+'</th>';
                        ColAttrVal=a.ALIGN+j;
                        if (ColAttrVal){
                           ColAttr['ALIGN'+(j)]=ColAttrVal;
                           ColAttr['DIR'+(j)]=ColAttrVal.toUpperCase()=='LEFT'?'ltr':'rtl';
                        } 
                        ColAttrVal=a.COLTYPE+j;
                        if (ColAttrVal){
                           ColAttr['COLTYPE'+(j)]=ColAttrVal;
                        }
                     }
                  }
               }
               catch(e){
               }
               self._Grd.push({id:id,tit:tit,col:s1,th:s2,dat:$dat,titrow:$titrow,ColAttr:ColAttr,
                  MaxRow:$v.MaxRow,UpDat:$v.UpDat
               });*/
               
         });
         $.each(data.rset.nopt,function(i,v){
               var $v=v, 
                   opt=[],
                   id=$v.id,
                   val=$v.val;
               if (id){
                  self.IsBindingInProgress=true;
                  self.ViewModel[id+OPTOPT].removeAll();
                  $.each($v.d,function(j,o){
                     //self.ViewModel[id+OPTOPT].push({val:$(o).attr('val'),dsc:$(o).attr('dsc')});
                     var OPTValue={};
                     $.each(o,function(k,w){
                        OPTValue[k]=w;//w.nodeValue;   
                     })
                     if (!(OPTValue.val==='' && OPTValue.dsc===''))
                        opt.push(OPTValue);
                  });
                  self.ViewModel[id+OPTOPT](opt);
                  self.IsBindingInProgress=false;
               }
               //if (val){
               //   self.IsBindingInProgress=true;
               //   //vformated=self.ValidationWidget.npformvalidation('NPFormat',self.MakeFullId(id),id,val);
               //   //self.ViewModel[id](vformated);                  
               //   self.Val(id,val);
               //   self.IsBindingInProgress=false;
               //}//else
               //   self.ViewModel[id](-1);
         }); 
         $.each(data.rset.n,function(Name,Value){ 
            //if (!Name.Opt||Name.Opt !=='1'){
               $.each(Value, function(Name1,Value1) {
                  var id=Name1;
                  var val=Value1;
                  if (id!=='Opt'){
                     self.IsBindingInProgress=true;
                     if (val)
                        val=$.NPTrim(val); 
                     self.Val(id,val);                 
                     self.IsBindingInProgress=false;
                  }
               });
            //}
         });
         $.each(data.outpar,function(Name,Value){
            //$.each(Value, function(Name1, Value1) {
            try{
               var id=Name;
               var val=Value;
               var _id;
               if (_id=self.W_.Alias2Id[id]){
                 id=_id;
               }
               if (ko.isObservable(self.ViewModel[id])){
                  self.IsBindingInProgress=true;
                  self.Val(id,val);
                  self.IsBindingInProgress=false;
               }
            }
            catch(exception){
               //npLog(exception,true);
               self.IsBindingInProgress=false;
            }
            //});// end of $.each($("outpar", $(data))[0].attributes, function(i, v)
         });   
         }else{  
            $("rset>grd", data).each(function(i,v){
               var $v=$(v),
                   id=$v.attr('id');
               var tit=null,a,$dat=$('dat',$v),s1='',s2='',$titrow=$('tit>row',$v);
               try{
                  a=$('tit>row',$v);
                  if(a.length>0){
                     tit=a.attr('IDTITLE');
                     for(var j=1;j<=a.attr('IDNUMBERCOL');j++){
                        s1+='<col width = "'+a.attr('IDWIDTH'+(j))+'px">';
                        s2+='<th>'+a.attr('IDCOLUMN'+(j))+'</th>';
                        ColAttrVal=a.attr('ALIGN'+(j));
                        if (ColAttrVal){
                           ColAttr['ALIGN'+(j)]=ColAttrVal;
                           ColAttr['DIR'+(j)]=ColAttrVal.toUpperCase()=='LEFT'?'ltr':'rtl';
                        } 
                        ColAttrVal=a.attr('COLTYPE'+(j));
                        if (ColAttrVal){
                           ColAttr['COLTYPE'+(j)]=ColAttrVal;
                        }
                     }
                  }
               }
               catch(e){
               }
               self._Grd.push({id:id,tit:tit,col:s1,th:s2,dat:$dat,titrow:$titrow,ColAttr:ColAttr,
                  MaxRow:$v.attr('MaxRow'),UpDat:$v.attr('UpDat')
               });
            });
            $("rset>n[Opt='1']", data).each(function(i,v){
               var $v=$(v), 
                   opt=[],
                   id=$v.attr('id'),
                   val=$v.attr('val');
               if (id){
                  self.IsBindingInProgress=true;
                  self.ViewModel[id+OPTOPT].removeAll();
                  $v.children().each(function(j,o){
                     //self.ViewModel[id+OPTOPT].push({val:$(o).attr('val'),dsc:$(o).attr('dsc')});
                     var OPTValue={};
                     $.each(o.attributes, function(k, w) {
                        OPTValue[w.name]=w.value;
                     });
                     if (!(OPTValue.val==='' && OPTValue.dsc===''))
                        opt.push(OPTValue);
                     
                  });
                  self.ViewModel[id+OPTOPT](opt);
                  self.IsBindingInProgress=false;
               }
               if (val){
                  self.IsBindingInProgress=true;
                  self.Val(id,val);
                  self.IsBindingInProgress=false;
               }
            });    
         
         }

         if ((self.ActNo=='00')&&(!SetInParam)&&(!self.RunResetBeforeForAct00)){
            self.RunResetBeforeForAct00=true;//add to prevet call reset for component that call Xml2VM after set value for father VM
            self.Reset(true);
            //if development team override Reset without firsttime parameter
            //or call _super without firsttime parameter _SetShowBtn method disable all button
            //so we call InitFrm_Core for prevent occur error
            self.InitFrm_Core(); 
            if ($('outpar',self.InParam).length){
               self._XML2ViewModel(self.InParam,{SetInParam:true});
            } 
         }
         if(!IsJSON){
            $("rset>n", data).each(function(i,v){
               var $v=$(v);
               if (!$v.attr('Opt')||($(v).attr('Opt')!=='1')){
                  $.each(v.attributes, function(j, o) {
                     var id=o.name;
                     var val=o.value;
                     if (id!=='Opt'){
                        self.IsBindingInProgress=true;
                        if (val)
                           val=$.NPTrim(val); 
                        self.Val(id,val);                 
                        self.IsBindingInProgress=false;
                     }
                  });
               }
            });
            $("outpar", data).each(function(j,o){
               $.each(o.attributes, function(i, v) {
                  try{
                     var id=v.name;
                     var val=v.value;
                     var _id;
                     if (_id=self.W_.Alias2Id[id]){
                        id=_id;
                     }
                     if (ko.isObservable(self.ViewModel[id])){
                        self.IsBindingInProgress=true;
                        self.Val(id,val);
                        self.IsBindingInProgress=false;
                     }
                  }
                  catch(exception){
                     //npLog(exception,true);
                     self.IsBindingInProgress=false;
                  }
               });// end of $.each($("outpar", $(data))[0].attributes, function(i, v)
            });
         }
         self.InternalChg_OnSubs=false;

      },
      FindTmplRecord: function(TmplArray,idF,idFSeq){
         var Result=null;
         $.each(TmplArray,
            function(k,w){
               if ((w.idF==idF)&&(w.idFSeq==idFSeq)){
                  Result=w;
                  return false;//return false to exit $.each
               }
            }   
         );
         return Result;
      },
      CheckVM2XmlRowTmpl: function(id, Row, act){
         return true;
      },
      CheckValAct_Core:function(act, ComponentReq){
         //ComponentReq is valid only for component
         var self = this;
         var FirstErrId='',id,c;
         if (act=='NextAct')
            act=self.NextAct;
         //$("r>com>modact[id='"+self.FMod+"']>act[id='"+act+"']>f", self.$ValidXml).each(function(i,v){
         $("r>com>act[id='"+act+"']>mod[id='"+self.FMod+"']>f", self.$ValidXml).each(function(i,v){
            var $v=$(v);
            id=$v.attr('id');
            var Req;
            if (ComponentReq&&ComponentReq=='0'){
               Req='0'; 
            } 
            else{
               Req=$v.attr('Req')||self.W_.FrmFld[id].Valid.Req;//$("r>n[id='"+id+"']", self.$ValidXml).attr('Req');
            }
            if (self.W_.FrmFld[id]&&self.W_.FrmFld[id].Enable){
               if ((self.W_.FrmFld[id].Type=='Cmp')&&(!self.W_.FrmFld[id].IsFaci)){
                  var ThisFrmFld=self.W_.FrmFld[id];//Elem=self.W_.FrmFld[id].Elem;
                  var RetId=//$.NPGetWidget(Elem)
                            ThisFrmFld.WidgetSelf.CheckValAct_Core('NextAct', Req);
                  if (FirstErrId == '')
                     FirstErrId=RetId;
               }
               else{
                  c=self.Val(id);
                  if (typeof(c)=='undefined')   c=''; 
                  if (self.CheckVal(self.MakeFullId(id),id,c,false,{Req:Req})<0){//{Req:$(v).attr('Req')})<0){
                     if (FirstErrId == '')
                        FirstErrId=self.MakeFullId(id);
                  }
               }
            }
         });
         return FirstErrId;      
      },
      CheckValAct:function(act){
         var self = this;
         var FirstErrId='';
         FirstErrId=self.CheckValAct_Core(act);
         if (FirstErrId !== ''){
            self.NPSetFocus(FirstErrId,null,false,false);
            //self.ValidationWidget.npformvalidation('NPSetFocus',self.MakeFullId(FirstErrId),FirstErrId,false,false);
            return 0;
         }
         return 1;         
      },
      //  این تابع  اطلاعات ابجکت ویومدل را در متغیر ایکس ام ال، جهت ارسال به سرور، اضافه می کند
      _ViewModel2XML:function(act, MaxHlp){
         var self = this, op=self.options,
             a,c,obs;
         var vfix, RootName, IsJSON=(op.CmpId&&(CmpByJSON.indexOf(op.CmpId)>-1));
         if (typeof(MaxHlp)=='object'){
            RootName=MaxHlp.RootName;
            MaxHlp=MaxHlp.MaxHlp
         }
         if (act=='Cmp'){
            if (!RootName){
               RootName='row'
            }
            a=$(RootName,$.parseXML('<'+RootName+'/>'));
         }
         else{
            if (IsJSON){
               a=self._SndXML.r={};
               self._SndXML.act=act;//a.act=act;
               //a.push({name:'act',val:act})
               if (MaxHlp&&(!isNaN(MaxHlp))){
                  self._SndXML.MaxHlp=MaxHlp;//a.MaxHlp=MaxHlp;
               }
               else{
                  delete self._SndXML.MaxHlp;//delete a.MaxHlp;
               }
            }else{
               a=$('r',self._SndXML);
               a.attr('act',act);
               if (MaxHlp&&(!isNaN(MaxHlp))){
                  a.attr('MaxHlp',MaxHlp);
               }
               else{
                  a.removeAttr('MaxHlp');
               }
            }
         }
         if (act !== '00'){
            if (act!=='NextAct')
               if (self.CheckValAct(act)==0)
                  return 0;
            //$(self.W_.FrmFld).each(function(i,v){
            //$("r>n", self.$ValidXml).each(function(i,v){
            $.each(self.W_.FrmFld,function(i,v){
               //var $v=$(v);
               var id=i;//id=$v.attr('id');
               var Typ=v.Valid.Typ;//$v.attr('Typ');
               /*if ((Typ=='Tmpl')&&(!v.Valid.RO||(v.Valid.RO!=='1'))){//(!$v.attr('RO')||($v.attr('RO')!=="1"))){
                  var TmplXml=$.parseXML('<?xml version="1.0" encoding="utf-8"?>' + '<Root/>');
                  var TmplXmlRoot=$('Root',$(TmplXml));
                  $('d',$v).each(function(j,o){
                     var idF=$(o).attr('idF'),
                        idFSeq=$(o).attr('idFSeq'),
                        RowViewModel;
                     RowViewModel=self.FindTmplRecord(self.ViewModel[id+OPTOPT](),idF,idFSeq);
                     if (RowViewModel){
                        var Row=$('<N>').appendTo(TmplXmlRoot);
                        $('n',$(o)).each(function(k,w){
                           var TempId=$(w).attr('id'),
                              AliasId;
                           var c=self.Val(TempId,{id:id,idF:idF,idFSeq:idFSeq})
                           if (typeof(c)=='undefined')   c='';
                           if (!$(w).attr('RO')||($(w).attr('RO')!=="1")){
                              //vfix=self.ValidationWidget.npformvalidation('NPFix',self.MakeFullId(id),id,c);
                              vfix=c;
                              if (AliasId=$(w).attr('Alias'))
                                 TempId=AliasId;
                              Row.attr(TempId,vfix);
                           }                          
                        });
                        if(!self.CheckVM2XmlRowTmpl(id,Row,act)){
                           Row.remove();
                        }
                     };
                  });       
                  var XmlVal=$(TmplXml).xml2();
                  XmlVal=XmlVal.substr( XmlVal.indexOf('>')+1);
                  a.attr(id,XmlVal);
               }
               else*/
               if ((v.Type=='Cmp')&&(!v.md)&&(!v.IsFaci)){//if ((self.W_.FrmFld[id].Type=='Cmp')&&(!self.W_.FrmFld[id].md)&&(!self.W_.FrmFld[id].IsFaci)){
                  if (!v.Valid.RO||(v.Valid.RO!=="1")){//if (!$v.attr('RO')||($v.attr('RO')!=="1")){
                     vfix=v.WidgetSelf._ViewModel2XML('Cmp');//self.W_.FrmFld[id].WidgetSelf._ViewModel2XML('Cmp');
                     if (vfix!==''){
                        var _id;
                        if (act=='Cmp'){
                           _id=v.Alias;//self.W_.FrmFld[id].Alias;
                        }
                        if (!_id) _id=id;
                        if (IsJSON)
                           a[_id]=vfix;//a.push({name:_id,val:vfix});//a[_id]=vfix;
                        else
                           a.attr(_id,vfix);
                        
                     }
                  }
               }
               else{
                  vfix=self.Val(id);
                  vfix&&(vfix=$.NPTrim(vfix));
                  if ((vfix)&&(!v.Valid.RO||(v.Valid.RO!=="1"))){//if ((vfix)&&(!$v.attr('RO')||($v.attr('RO')!=="1"))){
                     var _id;
                     if (act=='Cmp'){
                        _id=v.Alias;//self.W_.FrmFld[id].Alias;
                     }
                     if (!_id) _id=id;   
                     if (IsJSON)
                        a[_id]=vfix;//a.push({name:_id,val:vfix});//a[_id]=vfix;
                     else
                        a.attr(_id,vfix);
                  }
               }
            }); // end of $("r>n", self.$ValidXml).each(function(i,v){
         }//end of if (act !== '00'){
         if (act=='Cmp'){
            var XmlVal=a.parent().xml2()  
            XmlVal=XmlVal.substr( XmlVal.indexOf('>')+1);
            return XmlVal;
         }
         return 1;
      },
      AfterGetForm:function (Params,formhtml){
         var self=this;
         var op = self.options, e = self.element;
         Params.fname=Params.AddrPath+Params.FName;
         if (Params.inxml){
            if (typeof (Params.inxml) === "string"){
               Params.inxml=$.parseXML(Params.inxml);
            }
            //$(Params.NewFormAut).clone().appendTo($('root',$(Params.inxml)));
            $(Params.NewFormAut).appendTo($('root',$(Params.inxml)));
         }
         else{
            Params.inxml=Params.NewFormAut.wrap('<root/>').parent();
         }
         if (Params.OpenInNewWindow){
            var xparam=$(Params.inxml).xml2();
            if (xparam.indexOf('>')>0){
               xparam=xparam.substring(xparam.indexOf('>')+1,xparam.length);
               w=window.open(Params.fname+'.htm?x='+xparam,"_blank");
               //below code dosn't affect on the child form :((
               //because it hasn't access to other forms.
               var fff=function(){
                  if (w.document.readyState=='complete'){
                     w.ppp='ali';
                     w.Params={a:'ali'};           
                  }
                  else{
                     setTimeout(fff,10);
                  }
               };
               setTimeout(fff,10);
            }
            else{
               alert('اشکالی در باز شدن فرم جدید وجود دارد');
            }
            return;
         }
         formhtml=$.NPLocalStorage(Params.CmpId,'HTML');
         //var html_core=formhtml.substring(formhtml.search(/<body/i),formhtml.search(/<\/body>/i));
         //html_core=html_core.substring(html_core.search(">")+1,html_core.length);
         var html_core=formhtml.substring(formhtml.indexOf('<div'),formhtml.indexOf('</body>'))
         var dvMenuTabs=$.NPVars['dvMenuTabs'],//$('#dvMenuTabs'),
             dvMenuTabWrapper=$.NPVars['dvMenuTabWrapper'],//$('#dvMenuTabWrapper'),
             dvMenuTabsHeader=$.NPVars['dvMenuTabsHeader'],//$('#dvMenuTabsHeader'),
             dvMenuTabNav=$.NPVars['dvMenuTabNav']
         html_core=self.ReplaceParameter(Params.P_,html_core);

         var $FaciDiv;
         if (Params.OpenInline){
            $FaciDiv=Params.InlineBox;
            $FaciDiv.html(html_core);         
         }
         else{
            $FaciDiv=$('<div class="np-fitdivtoparent" style="position:relative;direction:rtl; padding:0px;overflow:hidden"></div>')
               .html(html_core)
               .appendTo(dvMenuTabWrapper);
            $FaciDiv.uniqueId();
            
         }
         var OpenerId=e.attr('id'),
             ChildOfOpenerId=$FaciDiv.attr('id'),
             ChildOfOpenerLabel=Params.FTitle;
         if (Params.UseOpenerCaption){
            ChildOfOpenerLabel=dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').find('A').html();
            //dvMenuTabs.find( ".ui-tabs-nav" ).find('li[aria-controls="'+OpenerId+'"]').find('A').html();
         }
         Params.OpenerSelf=self;   
         if (Params.OpenInDialog_ShowModal)      
            Params.OpenInDialog_ShowModal=true;
         else  
            Params.OpenInDialog_ShowModal=false;
         var TabId,NewLi;
         if (!Params.OpenInDialog&&!Params.OpenInline){
            dvMenuTabWrapper.show();//added921005 because on openMenu we hide this div
            //var tabTemplate = "<li id='#{liid}'><nobr><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></nobr></li>",
            TabId=$FaciDiv.attr('id');
            var tabTemplate = "<li id='#{liid}'><table class='np-MenuTabTable'><tr><td><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></td><td><a href='#{href}'>#{label}</a></td></tr></table></li>";
            NewLi = $( tabTemplate.replace( /#\{href\}/g, "#" + TabId ).replace( /#\{label\}/g, ChildOfOpenerLabel ).replace( /#\{liid\}/g, "li-" + TabId ) );
            if (Params.HideCloseIcon){
               NewLi.find('span').remove();
            }
            var TdOfdvMenuTabNav=dvMenuTabNav.parent(),
                dvMenuTabNav_Height=TdOfdvMenuTabNav.height();
            if (Params.OpenMenuForm){
               //dvMenuTabs.find( ".ui-tabs-nav" )
               dvMenuTabNav.prepend(NewLi);
               var MenuLI=$('li:eq(0)',GlobViewModel.dvMenuUL);
               GlobViewModel.MenuLI(MenuLI);

            }
            else if (Params.After){
               var CurrLi=$(dvMenuTabs.tabs('instance').tabs[dvMenuTabs.tabs( "option", "active")]);
               if (CurrLi){
                  CurrLi.after(NewLi);
               }
               else{
                  //dvMenuTabs.find( ".ui-tabs-nav" )
                  dvMenuTabNav.prepend(NewLi);
               }
            }
            else{
               //dvMenuTabs.find( ".ui-tabs-nav" )
               dvMenuTabNav.append(NewLi);
            }
            dvMenuTabs.tabs("refresh");
            //if (!Params.OpenMenuForm)
               dvMenuTabs.tabs( "option", "active",NewLi.index());
            if ((Params.CloseOpener)||(Params.HideOpener)||(Params.DisableOpener)){
               var OpenerLiIndex=//dvMenuTabs.find( ".ui-tabs-nav" )
                     dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').index();
               if (OpenerLiIndex!==-1){//OpenerLiIndex==-1 if use HideOpener in menu
                  dvMenuTabs.tabs( "disable",OpenerLiIndex);
                  if (Params.HideOpener){
                     //dvMenuTabs.find( ".ui-tabs-nav" )
                     dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').hide();
                  }
               }
            }
            if (dvMenuTabNav_Height!=TdOfdvMenuTabNav.height()){
               //Menu Bar Height changed;
               $(window).resize();
            }
         }
         else if (Params.OpenInDialog){
            var ww=Params.Width,
                hh=Params.Height=='auto'?e.height()-100:Params.Height;
            $FaciDiv.appendTo(self.Get$bod());//e); 
            TabId=$FaciDiv.attr('id');
            Params.OpenerSelf.W_.OpenedDialogs[TabId]=Params.$FaciDialogDiv=$FaciDiv;
            var DialogOpt={ 
               //autoOpen:false,
               closeOnEscape: false ,
               appendTo:self.Get$bod(),//self.parent$bod(),//e, 
               width:ww,
               height:hh,
               modal:Params.OpenInDialog_ShowModal,
               title:ChildOfOpenerLabel,//Params.FTitle,
               resize:function( event, ui ){
                  var NewSelf=$.NPGetWidget($FaciDiv);
                  $FaciDiv.add($('div:eq(0)',$FaciDiv)).height(ui.size.height-$(this).parent().find('.ui-dialog-titlebar').outerHeight(true));
                  NewSelf.ResizeHandler();           
               },
               close:function(){
                  /*if (Params.OpenInDialog_ShowModal){
                     $('.np-correct-overlay.np-faci-showmodal',$(e)).remove();
                  }*/
                  var NewSelf=$.NPGetWidget($FaciDiv);
                  NewSelf.Close();
               }
            };
            
            $FaciDiv.npDialog(DialogOpt);
            //$FaciDiv.npDialog('open');
            /*if (Params.OpenInDialog_ShowModal){
               e.prepend('<div class="np-correct-overlay np-faci-showmodal"></div>');
            }*/
            $FaciDiv.add($('div:eq(0)',$FaciDiv)).height($FaciDiv.npDialog("option", "height" ));
         }
         else if (Params.OpenInline){
            
         }

         $.NPCreateWidget($FaciDiv,Params.FName,Params);//{fname:Params.fname,inxml:Params.inxml})
         
         var NewSelf=$.NPGetWidget($FaciDiv,Params.FName);     
         GlobViewModel.OpenedSelf=NewSelf;                
         if (Params.StayForm){
            Params.OpenerSelf.W_.StayedForm[Params.StayFormId]={
               ThisFormId:TabId,
               self:NewSelf,
               Li:NewLi,
               Elem:$FaciDiv//Params.OpenerSelf.OpenedDialogs[TabId]
            };
         }
            

         if ((!Params.OpenInDialog)&&(!Params.HideCloseIcon)){
            dvMenuTabs.find("#li-" + TabId+ " span.ui-icon-close").on("click", 
               $.proxy(self.Close,$.NPGetWidget($('#'+ChildOfOpenerId)) ));
         };
         if (Params.ReturnCaption){
            $('#'+$.NPGetWidget($('#'+ChildOfOpenerId)).MakeFullId(ReturnButtonID))
               .css('display','');
            $('#'+$.NPGetWidget($('#'+ChildOfOpenerId)).MakeFullId(ReturnButtonID))
            .closest("div")
            .css("display",""); 
         }
         if (Params.OpenInDialog){
            $FaciDiv.npDialog("option", "position",{ my: "center", at: "center", of: dvMenuTabWrapper});//window });
         }
            
         if ((Params.CloseOpener)){
            self.Close({DontChangeTab:true});
         }
         //dvMenuTabsHeader.show();// must delete
      },
      GetNewForm:function(Params){//,CallBack){
         var self=this, op = self.options, e = self.element;
         var CallBack=function(){
            self.AfterGetForm(Params);//,htmdata);
            self.WebBusy=false;
            Params.OpenerSelf&&Params.OpenerSelf.CloseWaitingDialog();
            if (Params.AfterOpen){
               Params.AfterOpen.call(self,'ok');   
            }
         }
         var CompId;
         CompId={
            CompId:Params.CmpId,
            Js_FileName:Params.AddrPath+Params.FName+'.js',
            Html_FileName:Params.AddrPath+Params.FName+'.htm',
            Xml_FileName:Params.AddrPath+Params.FName+'.xml',
            CC_Filename:Params.AddrPath+'controlchange.htm'
         }
         self.GetComponent(CompId,CallBack);
          
         
      },
      RunAjax:function(SndXml,IsJSON,Complete,Error){
         var self=this;
         var op = self.options, e = self.element,async=true;
         
         if(self.ExitFromSystem){ // در حال خروج از سیستم هستیم
            if(self.ExitMsg){ // بدون کلیک روی خروج میخواهیم خارج شویم با بستن صفحه یا کلیک روی دکمه بک
               async=false;
               self.ExitMsg = false; // مجددا پیغام خروج نشان داده نشود
            } 
         }
         $.ajax({
            type: "POST",
            url: self.url,
            dataType: IsJSON?"json":"xml",
            contentType: IsJSON?"application/json; charset=utf-8":'text/xml; charset=utf-8',
            processData: false,
            async: async,
            data: SndXml,
            beforeSend: function(xhr) {
               (!IsJSON)&&xhr.setRequestHeader("SOAPAction", "urn:nowpardaz/NPService/srv"); 
            },
            complete: function(xhr, msg){
               Complete.call(this,xhr,msg);
               //self.W_.$bod.prop('disabled',false);
               //self.CloseWaitingDialog();
            },
            error: function(xhr, msg, et) {
               Error.call(this,xhr,msg,et);
               this._errMsg = xhr.responseText;
               npLog(et+':'+this._errMsg,true);
               //self.W_.$bod.prop('disabled',false);
               //self.CloseWaitingDialog();
            }
         });
      },
      OnClickExit:function(){ // در پردازش منو وقتی روی دکمه خروج کلیک میکنیم صدا زده میشود
        var self=this;
        self.ExitMsg = false; // پیغام خروج نشان داده نشود
        self.LogOut();
      },
      LogOut:function(){
         
        this.CloseThisFaci(
            function(){
               window.location="/";
            },true);
      },
      
      CloseThisFaci:function(CompleteCloseFaci,ExitFromSystem,self2){
         var self=this;
         self.CallDoAct_Logout(CompleteCloseFaci,ExitFromSystem?'99':'98',self2)
         /*var op = self.options, e = self.element;
         self.ExitFromSystem=ExitFromSystem;
         self._Init_SndXML('nav');//self._Init_SndNavXML();
         var self = this,c;
         if (ExitFromSystem){
            $('r',$(self._SndNavXML)).attr('act','99');
         }
         else{
            $('r',$(self._SndNavXML)).attr('act','98');
         };
         self.OpenWaitingDialog({NoOverlay:true});
         self.url="/frm/logout/logout.svc";
         self.RunAjax($(self._SndNavXML).xml2(),
            function(xhr, msg){
               if (msg == 'success'){
                  var CloseResp=$.parseXML(xhr.responseText),
                      CloseMsgs=$('msg',CloseResp);
                  if ($('error',CloseMsgs).length){
                     self._ShowErrorBox(CloseResp);
                     //in this case reponse get from server but ticket is expired
                     CompleteCloseFaci.call(this,self2);
                     //self.CloseWaitingDialog();
                  }
                  else{
                     CompleteCloseFaci.call(this,self2);
                  }
               }
            },
            function(xhr, msg, et) {
               self._ShowErrorBox($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg><error>فرم بسته نشد، ممکن است ارتباط شبکه قطع باشد. پس از بررسی دوباره تلاش کنید.</error></msg>'));
               //self.W_.$bod.prop('disabled',false);
               self.CloseWaitingDialog();
            }
         );*/
      },
      
      CallDoAct_Logout:function(CallBack,Act,self2){
         var self=this;
         var op = self.options, e = self.element;
         self.ExitFromSystem=Act=='99';
         self._Init_SndXML({Type:'logout'});//self._Init_SndNavXML();
         var self = this,c;
         $('r',self._SndNavXML).attr('act',Act);
         self.OpenWaitingDialog({NoOverlay:true});
         self.url="/frm/logout/logout.svc";
         self.RunAjax(self._SndNavXML.xml2(),
            false,
            function(xhr, msg){
               if (msg == 'success'){
                  var CloseResp=$($.parseXML(xhr.responseText)),
                      CloseMsgs=$('msg',CloseResp);
                  self.SetAutByResp(CloseResp);
                  if ($('error',CloseMsgs).length){
                     self._ShowErrorBox(CloseResp,false,false);
                     CallBack.call(this,self2?self2:CloseResp);
                  }
                  else{
                     self.CloseWaitingDialog();
                     CallBack.call(this,self2?self2:CloseResp);
                  }
                  

                  
               }
            },
            function(xhr, msg, et) {
               //self._ShowErrorBox($($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg><error>فرم بسته نشد، ممکن است ارتباط شبکه قطع باشد. پس از بررسی دوباره تلاش کنید.</error></msg>')));
               //self._ShowErrorBox($('<root><msg><error>فرم بسته نشد، ممکن است ارتباط شبکه قطع باشد. پس از بررسی دوباره تلاش کنید.</error></msg></root>'));
               self._ShowErrorBox({msg:{errors:['فرم بسته نشد، ممکن است ارتباط شبکه قطع باشد. پس از بررسی دوباره تلاش کنید.']}},false,true);
               //self.W_.$bod.prop('disabled',false);
               self.CloseWaitingDialog();
            }
         );
      },
      OpenNewForm:function(ftype,fid,subfrm,BrnNo,BrnLimit,Params){//AfterOpen,NewFormReturnCallback){
         if (typeof(BrnNo)=='object'){
            Params=BrnNo;
            BrnNo=null;
         }
         var self=this;
         var op = self.options, e = self.element;
         if (self.WebBusy){
            //if (Params.AfterNav){
            //   Params.AfterNav.call();
            //}
            return;
         }
         var dvMenuTabs=$.NPVars['dvMenuTabs'];//$('#dvMenuTabs');
         if (Params.StayForm){
            var NewFormId=Params.StayFormId='OpenedFid'+fid;
            var OpenedForm = self.W_.StayedForm[NewFormId];
            if (OpenedForm) {
               var Elem = OpenedForm.Elem;
               //OpenedForm.self.Reset();
               if (Params.OpenInDialog){
                  Elem.npDialog('open');
                  Elem.add(OpenedForm.self.W_.$bod).height(Elem.npDialog("option", "height"));
               }
               else{
                  Elem.show();
                  OpenedForm.Li.show()
                  dvMenuTabs.tabs("refresh");
                  dvMenuTabs.tabs( "option", "active",OpenedForm.Li.index());
               }
               OpenedForm.self.ResizeHandler();
               OpenedForm.self.InParam=Params.inxml;
               var P={NoAct00:true,ErLen:0,ReOpen:true};
               P.UserLvl=OpenedForm.self.UserLvl;
               OpenedForm.self.ActNo=P.ActNo='00';
               OpenedForm.self.ErLen=P.ErLen=0;
               //agar act00 daasht va dar act00 maghadir set shode dar form ghabli ra khande baashad
               OpenedForm.self.RunResetBeforeForAct00=false;
               OpenedForm.self._XML2ViewModel(OpenedForm.self.InParam);
               OpenedForm.self.Get_Data_Core(0, P);
               //OpenedForm.self._XML2ViewModel(OpenedForm.self.InParam);
               var TempDoAct=OpenedForm.self.InParam&&$('doact',OpenedForm.self.InParam).attr('act');
               if (TempDoAct){
                  OpenedForm.self.DoAct(TempDoAct,null,false);
               }
               return;
            }
         }   
         //var CallBack=function(){
         //   self.AfterGetForm(Params);//,htmdata);
         //   self.WebBusy=false;
         //   Params.OpenerSelf&&Params.OpenerSelf.CloseWaitingDialog();
         //   if (Params.AfterOpen){
         //      Params.AfterOpen.call(self,'ok');   
         //   }
         //}
         if (!Params.CmpId){
            Params.CmpId=fid;//important for create widget that use op.CmpId
         }
         if (Params.UseOpenerAut){//open new form by father session
            Params.AddrPath+='/';
            self.GetNewForm(Params);//, CallBack);
            return;
         } 
         self.WebBusy=true;
         self.OpenWaitingDialog({NoOverlay:true});
         //self.OpenWaitingDialog({NoText:true,NoDisable:true,NoOverlay:true});
         
         self._Init_SndXML({Type:'nav'});//self._Init_SndNavXML();
         var a,c;
         if (NavJSON){
            a=self._SndNavXML.aut;
            self._SndNavXML.r={act:''};
            a.nft=ftype;
            a.nf=fid;
            a.subfrm=subfrm;
            if (BrnNo){ 
               a.b=BrnNo;
            }
            if (BrnLimit){
               a.l=BrnLimit;
            }
            
         }else{
            a=$('aut',self._SndNavXML);
            $('r',self._SndNavXML).attr('act','');
            a.attr('nft',ftype);
            a.attr('nf',fid);
            a.attr('subfrm',subfrm);
            if (BrnNo){ 
               a.attr('b',BrnNo);
            }
            if (BrnLimit){
               a.attr('l',BrnLimit);
            }
         }
         self.url="/frm/nav/nav.svc"+(NavJSON?'/go':'');
         var ajaxdata;
         if (NavJSON){
            ajaxdata=JSON.stringify(self._SndNavXML);
         }else{
            ajaxdata=self._SndNavXML.xml2();
         }
         
         self.RunAjax(ajaxdata,NavJSON,
            function(xhr, msg){
               if(msg == 'success'){
                  var NavResp, NavOutPar, FatherTicket;
                  if (NavJSON){
                     NavResp=JSON.parse(xhr.responseText);
                     NavOutPar=NavResp.oaut;
                     FatherTicket=NavOutPar.nmtck;
                  }else{
                     NavResp=$.parseXML(xhr.responseText),
                     NavOutPar=$('oaut',NavResp),
                     FatherTicket=NavOutPar.attr('nmtck');
                  }
                  if (FatherTicket){
                     self.SetTckByResp(FatherTicket);
                  }
                  if ((NavJSON&&NavResp.msg.errors.length)||
                     (!NavJSON&&$('msg>error',NavResp).length)){
                     self._ShowErrorBox(NavResp,Params.ParentCmp,NavJSON);
                     self.CloseWaitingDialog();
                  }
                  else{
                     if (!Params.ParentCmp)
                        self._ShowErrorBox(self.EmptyMessage,false,true);                     
                     Params.AddrPath=(NavJSON?NavOutPar.nurlp:NavOutPar.attr('nurlp'))+'/',
                     Params.FName=NavJSON?NavOutPar.nurlf:NavOutPar.attr('nurlf'),
                     Params.FTitle=NavJSON?NavOutPar.nam:NavOutPar.attr('nam'),
                     Params.NewFormAut=NavJSON?self.Obj2AutXML(NavResp.aut):$('aut',NavResp);//.clone();
                     if ((Params.AddrPath=='/')&&(!Params.FName)){
                        //var xx=$($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg><error>مسیر برنامه این فرم تعریف نشده است.</error></msg>'));
                        //var LastVal=$('error',xx).text();
                        var xx={msg:{errors:['مسیر برنامه این فرم تعریف نشده است.']}};
                        var LastVal=xx.msg.errors[0];
                        if (!LastVal) LastVal='';
                        //$('error',xx).text(LastVal +'-'+(Params.FTitle?Params.FTitle:''));
                        xx.msg.errors[0]=LastVal +'-'+(Params.FTitle?Params.FTitle:'');
                        self._ShowErrorBox(xx,Params.ParentCmp,true);
                        self.CloseWaitingDialog();
                     }
                     else{
                        self.GetNewForm(Params);//, CallBack);
                     }
                  }
                  self.WebBusy=false;
               }
               else{
                  self.WebBusy=false;
                  self.CloseWaitingDialog();
               }
               if (Params.AfterNav){
                  Params.AfterNav.call();
               }
            },
            function(xhr, msg, et) {
               //self._ShowErrorBox($($.parseXML('<?xml version="1.0" encoding="utf-8"?><msg><error>خطا در دریافت اطلاعات فرم جدید</error></msg>')),Params.ParentCmp);
               self._ShowErrorBox({msg:{errors:['خطا در دریافت اطلاعات فرم جدید']}},Params.ParentCmp,true);
               self.CloseWaitingDialog(); 
               if (Params.AfterNav){
                  Params.AfterNav.call();
               }
            }
         );//RunAjax
      },
      GridOnRowClick:function(GridEvent,GridOnRowClickParams,HelpDialog){
         var self=this;
         var FocusToFirst=false
         function GetText(s){
            if (s.indexOf('<')>-1)
               return $('<A>' + s + '</A>').text();
            return s;
         }
         
         if (GridOnRowClickParams.AssignFields){
            $(eval(GridOnRowClickParams.RelField)).each(function(i,v) {
               if (v!==''){
                  var vformated=GridOnRowClickParams.Data.Td()[v[1]-1].Html();
                  //vformated=self.ValidationWidget.npformvalidation('NPFormat',self.MakeFullId(v[0]),v[0],vformated);
                  var ShowTag=GridOnRowClickParams.Grd._vm.Cols()[v[1]-1]['ShowTag'];//GridOnRowClickParams.Data.Td()[v[1]-1]['ShowTag'];
                  if (ShowTag&&ShowTag!=='0'&&ShowTag!=='1'){
                     vformated=vformated;                  
                  }
                  else{
                     vformated = GetText(vformated);//$('<a>'+vformated+'</a>').text();
                  }
                  self.Val(v[0],vformated);
                  if (!FocusToFirst){
                     var HlpArrId=[], HlpArrType=[];    
                     self.GetHlpIn(v[0],HlpArrId,HlpArrType);   
                     $.each(HlpArrId,function(j,o){
                        if (['Cmp','_Var'].indexOf(HlpArrType[j])==-1){
                           var $CurrObj=$('#'+o);
                           if ($CurrObj.length&&(!$CurrObj.prop('disabled')&&($CurrObj.css('display')!=='none'))){
                              setTimeout(function(){
                                 $CurrObj.focus();
                              },1);
                              FocusToFirst=true;
                              return false;// for break each loop
                           }
                        }
                     });

                     //if (self.W_.FrmFld[v[0]].Enable){
                     //   self.ValidationWidget.npformvalidation('NPSetFocus',self.MakeFullId(v[0]),v[0],true,true);                        
                     //   FocusToFirst=true; 
                     //}                     
                  }
                  //self.ValidationWidget.npformvalidation('ShowError',self.MakeFullId(v[0]),v[0],'');
                  
                  //self.Val(v[0],GridOnRowClickParams.Data.Td()[v[1]-1].Html());
               }
            });
         };
         return true;
      },
      CreateNPGrid:function(XmlData,NPGridOptions,TableObj){
         var self=this;
         var op = self.options, e = self.element;
         var id=$(XmlData).attr('id'),
             ActNo=NPGridOptions.ActNo; 
         //if (!id) return -1;

         NPGridOptions=NPGridOptions||{};
         if (!NPGridOptions.LinePerPage)
            NPGridOptions.LinePerPage=20;
         //NPGridOptions.NPForm=self;
         var ColPrefix=$(XmlData).attr('ColPrefix');
         if (ColPrefix){
            NPGridOptions.ColPrefix=ColPrefix;
         };
         if (!NPGridOptions['NoPaging']&&$(XmlData).attr('NoPaging')&&($(XmlData).attr('NoPaging')=='1')){
            NPGridOptions.Paging=false;
         }
         var AftFilRowFunction=$(XmlData).attr('AftFilRow'),
            OnClickRowFunction=$(XmlData).attr('OnClickRow'), 
            AftClickRowFunction=$(XmlData).attr('AftClickRow'),
            GetRowDataFunction=$(XmlData).attr('GetRowData'),
            AftSwitchFunction=$(XmlData).attr('AftSwitch'),
            GrdCompleteFunction=$(XmlData).attr('GrdComplete'),
            Radif=NPGridOptions.DefaultNoRadif?0:1;
         if (($(XmlData).attr('Radif'))&&(($(XmlData).attr('Radif')=='0')||($(XmlData).attr('Radif')=='no')))//no
            Radif=0;
         if (($(XmlData).attr('Radif'))&&($(XmlData).attr('Radif')=='1'))
            Radif=1;
         if (Radif){
            NPGridOptions.Radif=Radif;
         };
         if (AftFilRowFunction){
            NPGridOptions.AftFilRow=op[AftFilRowFunction];
         };
         if (OnClickRowFunction){
            NPGridOptions.OnRowClick=op[OnClickRowFunction];
         };
         if (AftClickRowFunction){
            NPGridOptions.AfterRowClick=op[AftClickRowFunction];
         };
         if (GetRowDataFunction){
            NPGridOptions.GetRowData=op[GetRowDataFunction];
         };
         if (AftSwitchFunction){
            NPGridOptions.AftSwitch=op[AftSwitchFunction];
         };
         if (GrdCompleteFunction){
            NPGridOptions.AfterGridDrawCompleted=op[GrdCompleteFunction];
         };
         
         NPGridOptions.InitOnRowClick=function(GridEvent,GridOnRowClickParams){
            var $CurrObj,
               FArr=new Array(),
               cnt=0,
               RelField;
            /*if (id&&($CurrObj=$('#'+self.MakeFullId(id),$(e)))){
               RelField=$CurrObj.attr('relfield');
               if (!RelField)
                  RelField='[]';
            }*/
            if (ActNo){
               RelField=self.Acts[ActNo].relfield;           
               if (!RelField)
                  RelField='[]';
            }
            
            $.each(GridOnRowClickParams.Data.Td(),function(i,v){
               FArr[cnt++]=v.Html();
            });                   
            GridOnRowClickParams.ColPrefix=NPGridOptions.ColPrefix;  
            GridOnRowClickParams.ActNo=NPGridOptions.ActNo;//self.ActNo;      
            GridOnRowClickParams.FArr=FArr;
            GridOnRowClickParams.AssignFields=RelField?true:false;
            GridOnRowClickParams.RelField=RelField;
            if (NPGridOptions.DefaultCloseDialog){
               GridOnRowClickParams.CloseDialog=true;  // only for helps
            }
         };                        
         NPGridOptions.InitAfterRowClick=function(GridEvent,GridOnRowClickParams){
            self.GridOnRowClick(GridEvent,GridOnRowClickParams, NPGridOptions.HelpDialog);
            if (NPGridOptions.DoActParams&&NPGridOptions.DoActParams.MSAutoC_Select)
               NPGridOptions.DoActParams.MSAutoC_Select(GridOnRowClickParams);
            if (GridOnRowClickParams.CloseDialog){
               NPGridOptions.HelpDialog.npDialog('close');
            }
         };//NPGridOptions.InitAfterRowClick
         var MinHeight=$(XmlData).attr('MinHeight');
         if (MinHeight){
            NPGridOptions.MinHeight=MinHeight;
         };
         NPGridOptions.ColAttr=NPGridOptions.ColAttr||{}
         var ColAttr=NPGridOptions.ColAttr;
         var Cols=[],RId=$(XmlData).attr('RId'),RIdCol=$(XmlData).attr('RIdCol');
         if (XmlData){
            $('col',XmlData).each(function(j,o) {
               Cols[j]=
               {
                  Data:$(o).attr('Dat'),
                  Hide:$(o).attr('Hide'),
                  Name:$(o).attr('Nam')
               };
               if ($(o).attr('COLTYPE')){
                  ColAttr['COLTYPE'+j]=ColAttr['COLTYPE'+j]||$(o).attr('COLTYPE');
               }
               if ($(o).attr('SHOWTAG')){
                  ColAttr['SHOWTAG'+j]=ColAttr['SHOWTAG'+j]||$(o).attr('SHOWTAG');
               }
               if ($(o).attr('DIR')){
                  ColAttr['DIR'+j]=ColAttr['DIR'+j]||$(o).attr('DIR');
               }
               if ($(o).attr('ALIGN')){
                  ColAttr['ALIGN'+j]=ColAttr['ALIGN'+j]||$(o).attr('ALIGN');
               }
               if ($(o).attr('MULTILINE')){
                  ColAttr['MULTILINE'+j]=ColAttr['MULTILINE'+j]||$(o).attr('MULTILINE');
               }
               /*if ($(o).attr('id')){
                  Cols[$(o).attr('id')]=
                  {
                     Data:$(o).attr('id'),
                     Hide:0,
                     Name:$(o).attr('Nam')
                  };
               }*/
            });
         }
         if (Cols){
            NPGridOptions.Cols=Cols;
         }
         if (RId){
            NPGridOptions.RId=RId;
            NPGridOptions.RIdCol=RIdCol;
         }
         var GridCover,idObj;
         if (id&&(idObj=$('#'+self.MakeFullId(id),$(e))))
            GridCover=self.GetCover(idObj);
         if (GridCover){
            NPGridOptions.GridCover=GridCover;
         };
         var RetVal=TableObj.npgrid(NPGridOptions),
             DlgId;
         if (DlgId=$(XmlData).attr('Dlg')){
            TableObj.npgrid('SetDlg',self.$np('#'+DlgId));
         }
         return RetVal;
      },
      OpenMenuForm:function(Callback){
         var self=this;
         var op = self.options, e = self.element, ThisFormId=e.attr('id');
         if (GlobViewModel.MenuLI()){
            GlobViewModel.dvMenuTabs.tabs( "option", "active",0);
         }
         else{
            function StartOpenMenu(){
               self.OpenNewForm(0, 11130, 0,/*BrnNo,BrnLimit,*/ {
                  OpenMenuForm:true,
                  HideCloseIcon:true,
                  inxml: '<root></root>',
                  AfterOpen: function (msg) {
                     if (msg == 'ok') {
                        if (Callback){
                           Callback();
                        }
                     }
                  },
                  CloseWaitingCallback: function(){
                     self.CloseWaitingDialog();
                  }
               });
            }
            if (GlobViewModel.OpenMenuPending){
               self.Message({
                  type:'confirm',
                  text : 'مولفه منو در حال باز شدن است. آیا مطمئن به درخواست مجدد هستید؟',
                  title : 'سوال',
                  AfterSelect:function(ev,answer){
                     if (answer.yes){
                        StartOpenMenu();
                     }
                  }
               });
               return;
            }
            GlobViewModel.OpenMenuPending=true;
            StartOpenMenu();
         }
      },
      showmenu:function(){
         this.OpenMenuForm();
      },
      CloseMenuForm:function(){
         var self=this;
         /*var op = self.options, e = self.element, ThisFormId=e.attr('id');
         var MenuForm=$('#'+MenuFormID);
         var dvMenuTabWrapper=$('#dvMenuTabWrapper');
         if (MenuForm.length){
            MenuForm.hide();
            dvMenuTabWrapper.show();
         }
         */
      },
      CloseDialog:function(){
         //use this method for close form if it opened in dialog,
         //itself call Close method at Close event of npDialog         
         var self=this, op = self.options;
         if (self.WebBusy){
            return;
         }
         if (op.$FaciDialogDiv){
            op.$FaciDialogDiv.npDialog('close');
         }
      },
      Close:function(CloseOptions,CloseCallBack){
         var self=this;
         var op = self.options, e = self.element, ThisFormId=e.attr('id'), OpenerId, OpenerLiIndex=-1;
         CloseOptions=CloseOptions||{};
         var dvMenuTabs=$.NPVars['dvMenuTabs'],//$('#dvMenuTabs');
             dvMenuTabNav=$.NPVars['dvMenuTabNav']
         var ForceClose=CloseOptions.ForceClose;
         var DontChangeTab=CloseOptions.DontChangeTab;
         if (self.WebBusy){//(self.FormInProcess){
            return;
         }
         var TdOfdvMenuTabNav=dvMenuTabNav.parent(),
             dvMenuTabNav_Height=TdOfdvMenuTabNav.height();

         if (self._trigger('BeforeClose')){
            if (op.StayFormId&&!ForceClose){
               self._trigger('AfterClose',null,op.ReturnParam);
               self.Reset();
               if (!op.OpenInDialog){
                  //TODO:Hide li va tab
                  if (!op.CloseOpener && op.OpenerSelf && op.OpenerSelf.W_ && !DontChangeTab){
                     OpenerId=op.OpenerSelf.element.attr('id');
                     OpenerLiIndex=//dvMenuTabs.find( ".ui-tabs-nav" )
                        dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').index();
                     if ((op.HideOpener)||(op.DisableOpener)){
                        if (OpenerLiIndex!==-1){
                           //dvMenuTabs.find( ".ui-tabs-nav" )
                           dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').show();
                           dvMenuTabs.tabs( "enable",OpenerLiIndex);
                        }
                     }
                     if (OpenerLiIndex!==-1){
                        dvMenuTabs.tabs( "option", "active",OpenerLiIndex);
                        dvMenuTabs.tabs("refresh");
                     }
                  }
                  //dvMenuTabs.find( ".ui-tabs-nav" )
                  dvMenuTabNav.find('li[aria-controls="'+ThisFormId+'"]').hide();
                  if (dvMenuTabNav_Height!=TdOfdvMenuTabNav.height()){
                     //Menu Bar Height changed;
                     $(window).resize();
                  }                  
               }
               return;
            }
            
            $.each(self.HelpGrids,function(i,v){
               if (v!==null){
                  try{v.remove();}catch(e){}
                  //v=null;
               }
            });
            $.each(self.HelpDialogs,function(i,v){
               if (v!==null){
                  try{v.remove();}catch(e){}
                  //v=null;
               }
            });

            var CloseFaciCallBack=function(self){
               var op = self.options, e = self.element, ThisFormId=e.attr('id'), OpenerId, OpenerLiIndex=-1;
               if (self.CloseMessageDialogTimer){
                  clearTimeout(self.CloseMessageDialogTimer);
                  self.CloseMessageDialogTimer=null;
               }     
               if (!ForceClose){
                  //in forceclose it's not require to call afterClose of Child node
                  self._trigger('AfterClose',null,op.ReturnParam);
               }
               if (op.OpenInDialog){
                  e.npDialog('destroy');
                  //op.OpenerSelf.element.find('.np-correct-overlay.np-faci-showmodal').remove();
               }
               else{
                  if (!op.CloseOpener && op.OpenerSelf && op.OpenerSelf.W_ && !DontChangeTab){
                     OpenerId=op.OpenerSelf.element.attr('id');
                     OpenerLiIndex=//dvMenuTabs.find( ".ui-tabs-nav" )
                        dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').index();
                     if ((op.HideOpener)||(op.DisableOpener)){
                        //OpenerLiIndex=(dvMenuTabs.find( ".ui-tabs-nav" ).find('li[aria-controls="'+OpenerId+'"]').index());
                        if (OpenerLiIndex!==-1){
                           //dvMenuTabs.find( ".ui-tabs-nav" )
                           dvMenuTabNav.find('li[aria-controls="'+OpenerId+'"]').show();
                           dvMenuTabs.tabs( "enable",OpenerLiIndex);
                        }
                     }
                  }
                  //dvMenuTabs.find( ".ui-tabs-nav" )
                  dvMenuTabNav.find('li[aria-controls="'+ThisFormId+'"]').remove();
               }
               //run destroy before remove because destroy clean knockout and decrease the child elem by destroy npgrids and help 
               self.destroy();
               ko.cleanNode(e[0]); 
               e.remove();
               
               if (op.OpenerSelf && op.OpenerSelf.W_){
                  op.OpenerSelf.W_.OpenedDialogs[ThisFormId]=null;
                  delete op.OpenerSelf.W_.OpenedDialogs[ThisFormId]; 
               }
               if (!op.OpenInDialog){
                  dvMenuTabs.tabs("refresh");
                  if (OpenerLiIndex!==-1){
                     dvMenuTabs.tabs( "option", "active",OpenerLiIndex);
                  }
                  if (dvMenuTabNav_Height!=TdOfdvMenuTabNav.height()){
                     //Menu Bar Height changed;
                     $(window).resize();
                  }                  
               }
               if (CloseCallBack){
                  CloseCallBack.call();
               }
            }//end of CloseFaciCallBack function(){
            var Counter=0;
            var ChildLen=0;
            var CounterCallBack=function(){
               ++Counter;
               if (Counter==ChildLen){
                  if (op.UseOpenerAut){
                     CloseFaciCallBack.call(this);
                  }
                  else{
                     self.CloseThisFaci(CloseFaciCallBack,false,self);
                  }
               }
            };
            $.each(self.W_.OpenedDialogs,function(i,v){
               if (v){
                  ChildLen++;
               }
            });
            $.each(self.W_.FrmFld,function(i,v){
               if (v.IsFaci){
                  ChildLen++;
               }
            });
            $.each(self.W_.StayedForm,function(i,v){
               if (v&&!v.self.options.OpenInDialog){
                  ChildLen++;
               }
            });
            $.each(self.W_.OpenedDialogs,function(i,v){
               if (v){
                  $.NPGetWidget(v).Close({ForceClose:true}, CounterCallBack);
               }
            });
            $.each(self.W_.FrmFld,function(i,v){
               if (v.IsFaci){
                  v.WidgetSelf.Close({ForceClose:true}, CounterCallBack);
               }
            });
            $.each(self.W_.StayedForm,function(i,v){
               if (v&&!v.self.options.OpenInDialog){
                  v.self.Close({ForceClose:true}, CounterCallBack);
               }
            });
            if (ChildLen==0){
               if (op.UseOpenerAut){
                  CloseFaciCallBack.call(this,self);
               }
               else{
                  self.CloseThisFaci(CloseFaciCallBack,false,self);
               }
            }
         }//end of if (self._trigger('BeforeClose')){
      },         
      SaveScrollTops:function(){
         var self=this;
         $.each(self.HelpGrids,function(i,v){
            if (v!==null){
               $(v).npgrid('SaveScrollTop');
            }
         });
         $.each(self.W_.FrmFld,function(i,v){
            if (v.Type=='Grd'){
               v.Elem.npgrid('SaveScrollTop');
            }
         });
         $.each(self.W_.FrmFld,function(i,v){
            if (v.IsFaci){
               v.WidgetSelf.SaveScrollTops();
            }
         });
         
         self.W_.$dvfrmCenterscrollTop=self.W_.$dvfrmCenter[0].scrollTop;
      },
      LoadScrollTops:function(){
         var self=this;
         $.each(self.HelpGrids,function(i,v){
            if (v!==null){
               $(v).npgrid('LoadScrollTop');
            }
         });
         $.each(self.W_.FrmFld,function(i,v){
            if (v.Type=='Grd'){
               v.Elem.npgrid('LoadScrollTop');
            }
         });
         $.each(self.W_.FrmFld,function(i,v){
            if (v.IsFaci){
               v.WidgetSelf.LoadScrollTops();
            }
         });
         
         if(self.W_.$dvfrmCenterscrollTop)
            self.W_.$dvfrmCenter[0].scrollTop=self.W_.$dvfrmCenterscrollTop;

      },
      OpenFaci: function (ft, f, subf,BrnNo,BrnLimit,Params) {
         var self = this, e = self.element,
             op = self.options;
         //self.OpenWaitingDialog();
         Params=$.extend({
            ReturnCaption: 'بازگشت',
            inxml: '<root></root>',
            AfterOpen: function (msg) {
               if (msg == 'ok') {
                  //OpenMenu(false);
                  self.CloseMenuForm();
               }
               //self.CloseWaitingDialog();
            }, 
            CloseWaitingCallback: function(){
               //self.W_.$bod.prop('disabled',false);
               self.CloseWaitingDialog();
            },
            AfterClose: function () {
               var dvMenuTabs = $.NPVars['dvMenuTabs'],//$("#dvMenuTabs"),
                   dvMenuTabNav=$.NPVars['dvMenuTabNav'],
                   MenuItemCnt=//dvMenuTabs.find(".ui-tabs-nav")
                     dvMenuTabNav.find('li').length;
               MenuItemCnt-=1;//for this form 
               MenuItemCnt-=1;//for menu
               if (MenuItemCnt< 1) {
                  //self.OpenMenuForm();
               }
            }
         },Params);
         //self.OpenNewForm(ft, f, subf,BrnNo,BrnLimit,Params); 
         self.OpenNewForm(ft, f, '',BrnNo,BrnLimit,Params); 
      },
      ResizeHandler: function () {
         var self = this,
             op = self.options,
             e = self.element; 
         if (op.ParentCmp)
            return;
         var dvfrmCenterHeight;
         var gap = self.W_.$dvfrmCenter.outerHeight(true) - self.W_.$dvfrmCenter.height(),
             NorthHeight = self.W_.$dvfrmHeader.outerHeight(true),
             SouthHeight = self.W_.$dvfrmFooter.outerHeight(true);
         if ((self.W_.$dvfrmHeader.css('display')=='none')||!NorthHeight)
            NorthHeight=0;
         if ((self.W_.$dvfrmFooter.css('display')=='none')||!SouthHeight)
            SouthHeight=0;
         dvfrmCenterHeight = self.W_.$bod.height() - gap - NorthHeight - SouthHeight;
         self.W_.$dvfrmCenter.height(dvfrmCenterHeight);
         $("r>n[Typ='Grd']", self.$ValidXml).each(function(i,v){
            var $v=$(v),
                id=$v.attr('id');
            if (self.W_.FrmFld[id]&&self.W_.FrmFld[id].Elem)
               self.W_.FrmFld[id].Elem.npgrid('ReCalcDim')    
         });
      },
      AppendNPFieldToXml:function(Param,ParentNode){ 
         var self = this,
             op = self.options,
             e = self.element,
             NewField=$('<n>'),
             MyElem;
         if (!ParentNode){
            ParentNode=$('r', self.$ValidXml);
         }
         if (Param&&Param.length){
            ParentNode.append(Param);
            return Param;
         }
         ParentNode.append(NewField);        
         $.each(Param,
            function(i,v){
               if (typeof(v)=='string'){
                  NewField.attr(i, v);
               }
            }
         );/*$.each(Param,*/
           
         /*var id, clk;
         if(id=Param.id){
            self.W_.FrmFld[id]=
            {
               Type:Param.Typ,
               Help:Param.Hlp,
               Req:Param.Req,
               Enable:true,  LastEnable:null,
               hlpin:'',      Lasthlpin:'',
               relfield:'',   Lastrelfield:''
            }
            var md=Param.md;
            if (md){
               md=eval(md);
               self.W_.FrmFld[id].md=md;
            }
            var Alias;
            if (Alias=Param.Alias){
               self.W_.Alias2Id[Alias]=id;
               self.W_.FrmFld[id].Alias=Alias;
            }
            if (Param.Typ=='Cmp'){
               var Elem=$('#'+self.MakeFullId(id+'_W_'),self.W_.$bod);
               self.W_.FrmFld[id].Elem=Elem;
               self.W_.FrmFld[id].WidgetSelf=$.NPGetWidget(Elem);
               var WidgetSelf=self.W_.FrmFld[id].WidgetSelf;
               if (Param.UrlF){
                  self.W_.FrmFld[id].IsFaci=false;
               }
               else{
                  self.W_.FrmFld[id].IsFaci=true;
               }
            }
            else{
               self.W_.FrmFld[id].Elem=$('#'+self.MakeFullId(id),self.W_.$bod);
            };
            if (clk=Param.OnClk){
               self.W_.FrmFld[id].Elem.attr('np-OnClk',clk);
            }
            
         }*/
         return NewField;               
      },
      FaciHelp:function(ftype,fid){
         var self=this,Aut;
         Aut=self.AutXml();//self.Resp
         if (!fid)
            fid=$("aut", $(Aut)).attr('f');
         if (!ftype)
            ftype=$("aut", $(Aut)).attr('ft');
         var s='/Forms/F0224_PROCESS_FACIHELP/F0224_PROCESS_FORMGUIDE.aspx?tck=' +
            $("aut", $(Aut)).attr('tck') +
            '&fi=' + fid +
            '&ft=' + ftype +
            '&sseq=0&br=1';
         if (window.showModalDialog)
            window.showModalDialog(s, '', 'help:no;resizable:yes;status:no;center:yes;dialogwidth=600px');
         else
            window.open(s, '', 'help:no;resizable:yes;status:no;center:yes;dialogwidth=600px');
      },
      ValidChgAttr:function(id,Attr,NewValue){
         var self=this;
         $("r>n[id='"+id+"']", self.$ValidXml).attr(Attr,NewValue);
         self.W_.FrmFld[id]['Valid'][Attr]=NewValue;
      },
      ValidChgNextAct:function(act,NextAct,md){
         var self=this;
         if(typeof md === 'undefined')md='0';
         var $com    = $("r>com",self.$ValidXml),
             $act=(act=='all'?$("act",$com):$("act[id='"+act+"']",$com));
         if ($act.length==0)
            return;
         var $modnode = (md=='all'?$("mod",$act):$("mod[id='"+md+"']",$act));
             //$modnode = (md=='all'?$("modact",$com):$("modact[id='"+md+"']",$com)),
            
         if (($modnode.length===0)&&(md!=='all')){
            $modnode = $("<mod id='"+md+"' />").appendTo($act);
         } 
         //return;
         //$act = (act=='all'?$("act",$modnode):$("act[id='"+act+"']",$modnode));
         //if(($act.length===0)&&(act!=='all')) 
         //   $act = $("<act id='"+act+"' />").appendTo($modnode);
         //$act.attr('nex', NextAct);
         $modnode.attr('nex', NextAct);
      },
      EmptyValid:function(act,md){
         var self=this;
         if(typeof md === 'undefined')md='0';
         var $com    = $("r>com",self.$ValidXml),
             $act= (act=='all'?$("act",$com):$("act[id='"+act+"']",$com));
             $modnode = (md=='all'?$("mod",$act):$("mod[id='"+md+"']",$act));//,
             //$modnode = (md=='all'?$("modact",$com):$("modact[id='"+md+"']",$com)),
             //$f;
         if($modnode.length===0) 
            return 0;
         //$act = (act=='all'?$("act",$modnode):$("act[id='"+act+"']",$modnode));
         //if(($act.length===0)) 
         //   return 0;
         //$("f",$act).remove();
         $("f",$modnode).remove();
      },
      //AddValid:function(act,f/*فیلدهايي که قرار است به ایکس ام ال ولیدیشن اضافه شود*/,md/*حالت فرم*/, AddReq){
      AddValid:function(act,f,md, AddReq){
         var self=this;
         if(typeof md === 'undefined')md='0';
         if (!$.isArray(f)){
            f=[f];
         }
         var $com    = $("r>com",self.$ValidXml),
             $act = (act=='all'?$("act",$com):$("act[id='"+act+"']",$com));
             //$f;
         if ($act.length===0)
            return; 
         var $modnode = (md=='all'?$("mod",$act):$("mod[id='"+md+"']",$act));
            
         if (($modnode.length==0)&&(md!='all')) 
            $modnode = $("<mod id='"+md+"' />").appendTo($act);
         //$act = (act=='all'?$("act",$modnode):$("act[id='"+act+"']",$modnode));
         //if (($act.length===0)&&(act!=='all')) 
         //   $act = $("<act id='"+act+"' />").appendTo($modnode);
         $(f).each(function(i,v){
            //$fnode = $("f[id='"+v+"']",$act);
            var $fnode = $("f[id='"+v+"']",$modnode);
            if ($fnode.length===0){  
               $fnode=$("<f id='"+v+"' />").appendTo($modnode);
               if (AddReq)
                  $fnode.attr('Req','1');
            }
         });
      },
      RemValid:function(act,f/*فیلدهايي قرار است از ایکس ام ال ولیدیشن حذف شود*/,md/*حالت فرم*/){
         var self=this;
         if(typeof md === 'undefined')md='0';
         if (!$.isArray(f)){
            f=[f];
         }
         var $com    = $("r>com",self.$ValidXml),
             $act = (act=='all'?$("act",$com):$("act[id='"+act+"']",$com));        
             //$act,$f;
         if ($act.length===0)
            return; 
         var $modnode = (md=='all'?$("mod",$act):$("mod[id='"+md+"']",$act));

         //if($modnode.length===0) 
         //   return 0;
         //$act = (act=='all'?$("act",$modnode):$("act[id='"+act+"']",$modnode));
         //if(($act.length===0)) 
         //   return 0;
         //$("r>com>modact[id='"+md+"']>act[id='"+act+"']>f",self.$ValidXml).each(function(i,fnode){

         /*$("f",$modnode).each(function(i,fnode){
            $(f).each(function(fi,fv){
               if ($(fnode).attr('id')===fv){
                  $(fnode).remove();
               }
            });
         });
         */
         
         $(f).each(function(fi,fv){
            $("f[id='"+fv+"']",$modnode).remove();
         });

      },
      RepValid:function(act,f/*فیلدهايي قرار است در ایکس ام ال ولیدیشن جایگزین شود*/,md/*حالت فرم*/){
         var self=this;
         if (typeof md === 'undefined')md='0';
         if (!$.isArray(f)){
            f=[f];
         }
         //$("r>com>modact[id='"+md+"']>act[id='"+act+"']",self.$ValidXml).remove();
         $("r>com>act[id='"+act+"']>mod[id='"+md+"']",self.$ValidXml).remove();
         self.AddValid(act,f,md);
      },
      //get or set variable in viewmodel
      /*i:single variable name or an array of pair {i:variable ,v:value}
        v:variable value if single item consider
        VPath:ViewModel Path
           example: 
              vm_PriFltOpt()[]>col0>val   ==>self.ViewModel['vm_PriFltOpt']().col0.val()
      */
      GetACCache:function(myId){
         var self=this;
         self.$np('#'+myId).npAutoComplete('SearchAndCache'); 
      },
      ClearACCache:function(myId){
         var self=this;
         self.$np('#'+myId).npAutoComplete('ClearCache');   
      },
      CreateObs: function (id, Def) {
        this.ViewModel[id] = ko.observable(typeof (Def) == undefined ? '' : Def);
        var NewField=$('<n>');
        var ParentNode=$('r', self.$ValidXml);
        ParentNode.append(NewField);        
        NewField.attr('id', id);
        NewField.attr('Def', Def);
        NewField.attr('Typ', '_Var');
      },
      CreateObsArr: function (id) {
        this.ViewModel[id] = ko.observableArray([]);
      },
      XAttrToViewModel: function (VAtt, XNode, XAtt, Def) {
         var self = this;
         self.XAttrToObject(null, VAtt, XNode, XAtt, Def);
      },
      XAttrToObject: function (Obj, VAtt, XNode, XAtt, Def) {
         var self = this;
         try{
            var val = XAtt == '$html' ? XNode.html() : XNode.attr(XAtt);
            Obj ? (Obj[VAtt] = val) : (self.Val(VAtt, val));
         } 
         catch (e) {
            if (typeof (Def) == undefined) Def = '';
            Obj ? (Obj[VAtt] = Def) : (self.Val(VAtt, Def));
         }
      },      
      ValOpt:function(i){
         var self=this,
             val=self.ViewModel[i](),
             optval=self.ViewModel[i+OPTOPT](),
             Ret;
         if ((!val)||(!optval))
            return; 
         $.each(optval,function(j,o){
            if (o.val==val){
               Ret=o; 
               return false;// for exit each loop            
            }
         });
         return Ret;
      },
      _Val:function(i,v,vm){
         var self=this;
         if (typeof(v)=='undefined'){//get value
            var c=ko.unwrap(vm[i]);
            if (!c)
               c='';
            var vfix=self.NPFix(self.MakeFullId(i),i,c);
            return vfix;//ko.unwrap(vm[i]);
         }
         else{//set value
            self.IsBindingInProgress=true;
            try{
               if (ko.isObservable(vm[i])){
                  var vformated=v.toString();
                  vformated=$.NPChangeNumToLatin(vformated);
                  vformated=vformated?self.NPFormat(self.MakeFullId(i),i,vformated):vformated;
                  vm[i](vformated);
                  self.W_.FrmFld[i].Val=vformated;
                  self.ShowError(self.MakeFullId(i),i,'');
                  //vm[i](v.toString());
                  if ((!isNaN(vformated))&&(vm[i]()!==vformated)){//v.toString()){//for option that not exists in select
                     vm[i](null);
                     self.W_.FrmFld[i].Val=vm[i]();                       
                  }
                  self.IsBindingInProgress=false;
                  return;
               }
               else{
                  vm[i]=v.toString();
               }
               self.IsBindingInProgress=false;
            }
            catch(e){
               self.IsBindingInProgress=false;
            } 
         }
      },
      //get or set variable in viewmodel
      /*i:single variable name or an array of pair {i:variable ,v:value}
        v:variable value if single item consider
        
        Val(i)
        Val(i,v)
        Val(i,RadifObj)
        Val(i,v,RadifObj)
        RadifObj:{id , idF , idFSeq}
      */   
      ValByKeyboard:function(i,v,RadifObj){
         //use this method for tag this elem changed by user
         var self=this;
         self.Val(i,v,RadifObj);
         //self.$np('#'+i).data('npchange','1');
         self.$np('#'+i).data(
            {
               'npchange':'1',
               'npchange-autoc':'1'
            }
         );
         
         //if we have RadifObj, we must npchange set for certain obj 
      },   
      Val:function(i,v){//,RadifObj){//KoIndex){//VPath,VPathID){
         var self=this,
             vm=self.ViewModel;
         //if (typeof(v)=='object'){
         //   RadifObj=v;
         //   v=undefined;
         //}
         if (!$.isArray(i)){
            //if ($("r>n[id="+i+"]",$(self.$ValidXml)).length||!$("r>n>d>n[id="+i+"]",$(self.$ValidXml)).length){
            //   //if exist in root or not in child of Templates
               return self._Val(i,v,vm);
            //}
            /*else{
               var id, idF, idFSeq,
               RowViewModel;
               if (RadifObj){
                  idF=RadifObj.idF;
                  idFSeq=RadifObj.idFSeq;
                  id=RadifObj.id; //id of parent for examlple PubFlt
               }
               if (!idF){
                  var N_D_N=$("r>n>d>n[id="+i+"]",$(self.$ValidXml));
                  if (N_D_N.length){
                     var N_D=N_D_N.parent(),
                         ROOT_N=N_D.parent();
                     id=ROOT_N.attr('id');
                     idF=N_D.attr('idF');
                     idFSeq=N_D.attr('idFSeq');
                  }
               }
               var vm_Opt;
               if (!id||!(vm_Opt=ko.unwrap(vm[id+OPTOPT])))
                  return undefined;      
               RowViewModel=self.FindTmplRecord(vm_Opt,idF,idFSeq);
               if (RowViewModel){
                  return self._Val(i,v,RowViewModel);
               }
               else{
                  return undefined;
               }
            }*/
         }
         else{
            $(i).each(function(index,o){
               self.Val(o.i,o.v);
            });
         }
      },
      /*'Val':function(i,v,VPath,VPathID){
         if (VPath){
               var TempPath=VPath;
               function ChangeLocalVM(LocalPath){
                  var PosParantez=LocalPath.indexOf('()'),
                     PosKoroshe=LocalPath.indexOf('[]'),
                     LocalPathLen=LocalPath.length,
                     FirstPK;
               FirstPK=Array.min([PosParantez==-1?LocalPathLen:PosParantez,PosKoroshe==-1?LocalPathLen:PosKoroshe]);
               vm=vm[LocalPath.substr(0,FirstPK)];
               if (PosParantez<PosKoroshe){
                  if (PosParantez>-1){
                     vm=vm();
                  }
               }
               var TempVM;
               if (PosKoroshe>-1){
                  $.each(vm,function(j,o){
                     if((o.id)&&
                        ((o.id==VPathID)||
                           ((ko.isObservable(o.id))&&(o.id()==VPathID))
                        )
                        
                     ){
                        TempVM=o;
                        return false;
                     }
                  });
                  if (PosParantez>PosKoroshe){
                     vm=TempVM();
                  }else{
                     vm=TempVM;
                  }
               }
               }
            function SplitViewModelPath(){
                  if (TempPath.indexOf('>')>-1){
                     var myLocalPath=TempPath.substr(0,TempPath.indexOf('>'));
                     ChangeLocalVM(myLocalPath);
                     TempPath=TempPath.substr(TempPath.indexOf('>')+1,TempPath.length);
                     SplitViewModelPath();
                  }else{
                     var myLocalPath=TempPath;
                     //ChangeLocalVM(myLocalPath,true);
                  }
            }
            SplitViewModelPath();
                 i=TempPath;
                      
            }

          
         */
      'Toggle':function(evt){
         var self=this,
             SrcElemId=typeof(evt)=='object'?evt.currentTarget.id:evt;
             //$c=$("r>n[id='"+self.MakeOrgId(SrcElemId)+"']", self.$ValidXml),
             currensstate='VIS',
             ThisFrmFld=self.W_.FrmFld[self.MakeOrgId(SrcElemId)],
             Valid_=ThisFrmFld.Valid;
         $('#'+SrcElemId).toggleClass('ui-icon-circle-minus');
         $('#'+SrcElemId).toggleClass('ui-icon-circle-plus');
         if (Valid_.CurState==='VIS'){//$c.attr('CurState')==='VIS'){
            Valid_.CurState='INVIS';//$c.attr('CurState','INVIS');
         }
         else{
            Valid_.CurState='VIS';//$c.attr('CurState','VIS');
            currensstate='INVIS';
         }
         var RelObj;
         if (RelObj=Valid_.RelObj){//$c.attr('RelObj')){
            self.$np('#'+RelObj).css('display',((currensstate==='INVIS')?'':'none'));
         }
         self.ResizeHandler();
         //$(window).trigger('resize');
         //$(window).resize();
           
      },
      CreateCodeMirrorObj:function (ObjName, Params){
         var self = this, e = self.element, op = self.options,TxtArea=self.$np('#'+ObjName);
         Params=Params||{};
         CodeMirrorType=Params.Mode||'javascript';
         var fu=
         $('<input src="/img/fullscr.png" type="image" />')
            .css({'marginTop': '-4px', 'marginRight': '-6px' , 'float': 'right'})
            .click(function(){ 
               if (TxtArea.prop('np-cm')){
                  self.Val(ObjName,TxtArea.prop('np-cm').getValue());
                  TxtArea.prop('np-cm').toTextArea();
                  $(TxtArea.prop('np-wd')).append(TxtArea.parent());                   
                  //TxtArea.parent().css({'position':'',top:'',left:''})
                  $(TxtArea.prop('np-FullScrDiv')).remove();
                  TxtArea.prop('np-cm',null);
               }
               else{
                  TxtArea.prop('loc',{w:TxtArea.width(),h:TxtArea.height()});
                  //TxtArea.css({width:$(window).width()-30,height:$(window).height()-30});
                  var FullScrDiv = 
                  $('<div />')
                     .css({'position':'absolute','zIndex':100})
                     .position({
                        my:"left top",
                        at:"left+10 top+4",
                        of:self.$np('#bod')
                     })
                     .append(TxtArea.parent())
                     .appendTo(self.$np('#bod'));              
                     //TxtArea.parent().css({'position':'absolute',top:15,left:15})
                  var cm = 
                  CodeMirror.fromTextArea(TxtArea[0], {
                     mode: CodeMirrorType,
                     indentWithTabs: true,
                     smartIndent: true,
                     lineNumbers: true,
                     foldGutter: true,
                     /*lineWrapping: true,
                     matchBrackets : true,*/
                     autofocus: true,
                     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                     extraKeys: {
                        "Ctrl-Space": "autocomplete"
                     }

                  });
                  if (TxtArea.prop('disabled'))
                     cm.setOption('readonly',true);
                  cm.setSize(self.$np('#bod').width()-20,self.$np('#bod').height()-25);
                  TxtArea.prop('np-cm',cm);                   
                  TxtArea.prop('np-FullScrDiv',FullScrDiv);
               }
            });//.click()
         /*var WrapperDiv = $('<div />');
         TxtArea.prop('np-wd',WrapperDiv);*/
         TxtArea.wrap($('<div />')).before(fu).parent().wrap($('<div />'));
         TxtArea.prop('np-wd',TxtArea.parent().parent());
         return;
         /*var cm=CodeMirror.fromTextArea(self.$np(ObjName)[0], {
                mode: 'javascript',
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                //lineWrapping: true,
                //matchBrackets : true,
                autofocus: true
            });
         return cm; */
      },
      //Depricated GetCodeMirror
      GetCodeMirror:function(CallBackFunc){
         var self = this, e = self.element, op = self.options;
         if ($('link[href="/pkg/codemirror/lib/codemirror.css"]').length == 0)
            if (document.createStyleSheet) {
               document.createStyleSheet("/pkg/codemirror/lib/codemirror.css");
            } 
            else {
               $("head").append('<link href="/pkg/codemirror/lib/codemirror.css" type="text/css" rel="Stylesheet" />');
            }
         if ($('link[href="/css/npcodemirror.css"]').length == 0)
            if (document.createStyleSheet) {
               document.createStyleSheet("/css/npcodemirror.css");
            } 
            else {
               $("head").append('<link href="/css/npcodemirror.css" type="text/css" rel="Stylesheet" />');
            }
         $.ajax({
            url : "/pkg/codemirror/lib/codemirror.js",
            cache : true,
            async : true,
            dataType : "script",
            success : function(data, textstatus) {
               $.ajax({
                  url : "/pkg/codemirror/mode/javascript/javascript.js",
                  cache : true,
                  async : true,
                  dataType : "script",
                  success : function(data, textstatus) {
                     $.ajax({
                        url : "/pkg/codemirror/formatting.js",
                        cache : true,
                        async : true,
                        dataType : "script",
                        success : function(data, textstatus) {
                           CallBackFunc();
                        }/*success:function(data,textstatus)*/
                     });
                     /*$.ajax({*/
                  }/*success:function(data,textstatus)*/
               });
               /*$.ajax({*/

            }/*success:function(data,textstatus)*/
         }); 
      },
      /*File Upload*/
     /*
      * ClkElem : Dom Element that perform the upload action. user must click on it to upload,
      * UsrParm : an object contains the field that filiid return back to it , .... example {act:uploadactno,
      *                                                                                      hhr:1,
      *                                                                                      isbinary:1,
      *                                                                                      id:'F56245',
      *                                                                                      fnam:'G12354',
      *                                                                                      len:'F25654',
      *                                                                                      fuq='G12451',
      *                                                                                      ftck='E1452',
      *                                                                                      ext:xml}
      * CallBack? 
      */
      upl:function(ClkElem,UsrParm,CallBack){
         var self = this, e = self.element, op = self.options;
         self.updwn(true,'/frm/npupl/default.aspx',ClkElem,UsrParm,CallBack);
      },
      dwn:function(ClkElem,UsrParm,CallBack){
         var self = this, e = self.element, op = self.options;
         self.updwn(false,'/frm/npdwn/default.aspx',ClkElem,UsrParm,CallBack);
      }  ,   
      updwn:function(isupl,url,ClkElem,UsrParm,CallBack){
         var self = this, e = self.element, op = self.options;
         $(ClkElem).npupdwn({
            url:url,
            upl:isupl,
            AppendTo:self.W_.$bod,
            InData : function(ev,data){
               var x= $($.parseXML('<?xml version="1.0" encoding="utf-8"?><x><r xmlns="urn:nowpardaz" /></x>'));
               $.each(UsrParm(),function(i,v){
                  if(i==='act'){
                     data.act=v;
                  }
                  else{
                     $('r',x).attr(i,v);
                  }
               });
               //$('aut',$(self.Resp)).clone().appendTo($('x',$(x)));
               $('aut',self.AutXml()).clone().appendTo($('x',x));
               data.xml=x.xml2();
            },
            AfterGO : function(ev,data){
               self.Resp = $($.parseXML(data.xml));
               self.SetAutByResp(self.Resp);
               var Params={};
               self.ActNo=Params.ActNo=data.act;
               self.Get_Data(null,Params);
            },
            BeginGO:function(){
               self.WebBusy=true;
               self.OpenWaitingDialog();
            },
            EndGO:function(){
               self.WebBusy=false;
               self.CloseWaitingDialog();
            }
         });
      },
      
      //By Saeed Jafary
      // This Function Call When Developer Need A Massage Box Like Alert Or Confirm
      // Message Function Make npmessage Widget
      Message:function(Message) {
         var self = this, op = self.options, e = self.element;
         self.W_.$bod.npmessage('Dialog',Message);
      },
      _destroy:function(){
         var self=this;
         //if (!self.ValidationWidget){
         //   npLog('there is not ValidationWidget',true);
         //}
         //self.ValidationWidget.npformvalidation('destroy');
         //self.ValidationWidget.remove();
         //delete self.ValidationWidget; 
         $.each(self.W_.FrmFld,function(id,ThisFrmFld){
         //$('r>n',this.$ValidXml).each(function(i,v){
         //   var $v=$(v),
         //       id=$v.attr('id'),
            var Typ=ThisFrmFld.Valid.Typ;//$v.attr('Typ');
            switch (Typ){
               case "Grd":{
                  ThisFrmFld.Elem.npgrid('destroy')
                  break;
               }
               case "SHtm":
               case "Htm":{
                  ko.removeNode(self.$np('#'+id)[0]) 
                  break;
               }
               default:{
                  
               }
            }
            //ko.removeNode(self.$np('#'+$v.attr('id'))[0]);
         });
         //ko.cleanNode(self.W_.$bod.parent()[0]);// if clean node the widget, it call $.cleanData that call destroy for the second one
         //ko.cleanNode(self.W_.$bod[0]);
         ko.removeNode(self.W_.$bod[0]);
         delete self.W_;
         delete self.Valid_
      },
      _SetCurrValidationData:function(CurrOrgId){ 
         var self = this, e = self.element, op = self.options;
         var selfV=self.Valid_;
         if (!CurrOrgId) return false;
         if (!self.W_.FrmFld[CurrOrgId]) return false;
         if (CurrOrgId == selfV.ActElemId){
            return true;
         }
         selfV.ActElemId=CurrOrgId;
         //delete selfV.ActElemOptions;
         //selfV.ActElemOptions={};
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
         /*var XmlNode=$("r>n[id="+CurrOrgId+"]",$(self.$ValidXml));
         XmlNode
         .eq(0)
         .each(
           function(i,v){
              var $v=$(v);
              MyCounter1=MyCounter1+1;
              if (MyCounter1>1){
                 alert('chera 2 ta peyda shod?');
              }
              $(v.attributes).each(function(j,o){
                 selfV.ActElemOptions[o.name]=o.value;
              });//end of $(v.attributes).each(function(j,o)
              selfV.CurLang=$v.attr('CurLang')?$v.attr('CurLang'):'';
           }
         );//end of $("n[id="+CurrObj.id+"]",$(selfV.$ValidXml)).each
         */
         //$v.attr('CurLang')?$v.attr('CurLang'):'';
         if (!(selfV.CurLang=ActElemOptions.CurLang)){
           switch(ActElemOptions.Lan){//selfV.ActElemOptions.Lan){
              case '2':{
                 selfV.CurLang='latin';
                 break;
              }
              case '1':{
                 selfV.CurLang='farsi';
                 break;
              }
              case '3':{
                 selfV.CurLang='farsi';
                 break;
              }
              case '255':{
                 selfV.CurLang='all';
                 break;
              }
              default:{
                    selfV.CurLang = 'all';
              }
            }
            //XmlNode.attr('CurLang',selfV.CurLang);
            ActElemOptions.CurLang=selfV.CurLang;
         }
        /*if ((!selfV.ActElemOptions.Max)&&(selfV.ActElemOptions.To)){
           selfV.ActElemOptions.Max=selfV.ActElemOptions.To.length;
        }
        if ((!selfV.ActElemOptions.Dec)&&(selfV.ActElemOptions.To)){
           var pos,to=selfV.ActElemOptions.To;
           pos=to.indexOf('.')
           if (pos>-1){
              selfV.ActElemOptions.Dec=(to.substr(pos+1).length);
           }
        }*/
         return true;
      },
      StartValidationCheck:function(){
         var self = this, e = self.element, op = self.options;
         if (!LengthOfStudentNo)
            LengthOfStudentNo=10;
         $.ui.keyCode.NUMPAD_DECIMAL=110;
         var selfV=self.Valid_={ 
            IsChangeInProgress   :false,
            ActElemId            :'',
            //ActElemOptions       :{},
            CurLang              :null,
            ML                   :[[31, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30],
                                   [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] 
                                  ],
            ControlKeys          :[18,//$.ui.keyCode.ALT,//18
                             $.ui.keyCode.BACKSPACE,//8
                             1,//$.ui.keyCode.CAPS_LOCK,//undefined
                             17,//$.ui.keyCode.CONTROL,//17  
                             $.ui.keyCode.DELETE,//46
                             $.ui.keyCode.DOWN,//40
                             $.ui.keyCode.END,//35
                             $.ui.keyCode.HOME,//36
                             $.ui.keyCode.INSERT,//
                             $.ui.keyCode.LEFT,//37
                             $.ui.keyCode.RIGHT,//39
                             16,//$.ui.keyCode.SHIFT,//16
                             $.ui.keyCode.UP,//38
                             $.ui.keyCode.TAB//9
                             ]
         
         }
         function TriggerEvent(id,AttrName,myEvent){
            //if (AttrName&&that.data('np-'+AttrName)){
            if (self.W_.FrmFld[id]['np-'+AttrName]){
               self._trigger(self.W_.FrmFld[id]['np-'+AttrName],myEvent);//event,[myEvent]);
            }
         }
         self._on(self.W_.$bod,{
            'click [id]':function(myEvent){
               var id=$(myEvent.currentTarget).data('orgid')
               if (self.W_.FrmFld[id]){ 
                 TriggerEvent(id,'OnClk',myEvent);
                 TriggerEvent(id,'OpenFaci',myEvent);
               }
            },
            'blur [id]':function(myEvent){
               var id=$(myEvent.currentTarget).data('orgid')
               if (self.W_.FrmFld[id]){ 
                  TriggerEvent(id,'OnBl',myEvent);
               }
            },
            'focus :input':function(myEvent){
               selfV.IsChangeInProgress = false;
               var el = $(myEvent.currentTarget),
                   orgid=el.data('orgid');
               self._SetCurrValidationData(orgid);
               
               if((el[0].type == "text" || el[0].type == "textarea") && !el.attr("readonly")){
                  var offset=el.offset();
                  var Left = (el.attr('dir') == 'ltr')? offset.left : offset.left+el.outerWidth()-GlobViewModel.LangShow.outerWidth(),
                      Top =  offset.top-GlobViewModel.LangShow.outerHeight();
                  GlobViewModel.LangShow.text((selfV.CurLang == "farsi") ? "FA" : "EN")
                                        .css({'display':'','left':Left+'px','top':Top+'px'});
                                        
                  var Type = (self.W_ && self.W_.FrmFld && self.W_.FrmFld[orgid]) ? self.W_.FrmFld[orgid].Type : "";
                  var PreventShowLanguage = (Type == 'Int' || Type == 'StdNo' || Type == 'PDat' || Type == 'GDat' || Type == 'SSNo' || Type == 'Flt' || Type == 'Tim' || orgid == undefined);                     
                  if(PreventShowLanguage )
                     GlobViewModel.LangShow.hide();                      
               }
               window.clearTimeout(self.LangTimer);
               self.LangTimer = setTimeout(function(){    
                  GlobViewModel.LangShow.hide();
               }, 1000);
               //show language tooltip
               myEvent.stopPropagation();
            },
            'blur :input':function(myEvent){
               GlobViewModel.LangShow.hide();
               if (selfV.IsChangeInProgress)
                  return;
               var $CurrObj=$(myEvent.currentTarget);
               if ($CurrObj.data('npchange')=='1'){
                  $CurrObj.data('npchange','0');
                  self._Chg_Core($CurrObj);
               }
            },
            'keypress :input':function(myEvent){
               self._KeyPress(myEvent,$(myEvent.currentTarget));
            },
            'keyup :input':function(myEvent){
               self._KeyUp(myEvent,$(myEvent.currentTarget));
            },
            'keydown :input':function(myEvent){
               self._KeyDown(myEvent,$(myEvent.currentTarget));
            },
            'change :input':function(myEvent){
               $(myEvent.currentTarget).data('npchange','0');
               self._Chg(myEvent,$(myEvent.currentTarget));
            }
         });
      },
      _KeyPress:function(myEvent,$CurrObj,EditorId){
         var self = this, e = self.element, op = self.options;
         var CurrOrgId=$CurrObj.data('orgid');
         var CurrFullId=$CurrObj.attr('id');
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return;
         if($CurrObj.attr('readonly')){   
            myEvent.preventDefault();
            return;  
         }
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;

         var selfV=self.Valid_
         var key, key2, shift;
         var keyCode = $.ui.keyCode;
         key = (myEvent.keyCode ? myEvent.keyCode : myEvent.which);
         key2 = myEvent.which;
         shift = myEvent.shiftKey;
         if(ActElemOptions.Typ== "Htm"){
            return;
         }
         if (key == $.ui.keyCode.ENTER && ActElemOptions.TextArea){
            return;
         }
         // Add By S.Jafari Start
         var SpecialKeys = "60 61 62 13 32 48 49 50 51 52 53 54 55 56 57 64 35 33 36 37 94 38 42 40 41 95 43 45 46 47 124";
         if(((self.LastKey >1547 && key <= 1547) || (self.LastKey<=1547 && key>1547)) && (SpecialKeys.indexOf(key) == -1)){
            selfV.CurLang = (selfV.CurLang == "latin") ? "farsi" : "latin" ;
            ActElemOptions.CurLang = selfV.CurLang;  
         }
         if(SpecialKeys.indexOf(key) == -1)
            self.LastKey = key;
         // Add By S.Jafari End
         if (key > 1547) {
            if (ActElemOptions.Lan == "2") {
               alert("لطفا حالت صفحه کليد خود را به انگليسي تغيير دهيد.");
               myEvent.preventDefault();
               return;
            }
            else 
            {
              var obj = {};
              obj['1588']=97; // ش
              obj['1584']=98; // ذ
              obj['1586']=99; // ز
              obj['1740']=100; // ی
              obj['1579']=101; // ث
              obj['1576']=102; // ب
              obj['1604']=103; // ل
              obj['1575']=104; // ا
              obj['1607']=105; // ه
              obj['1578']=106; // ت
              obj['1606']=107; // ن
              obj['1605']=108; // م
              obj['1574']=109; // ئ
              obj['1583']=110; // ن 
              obj['1582']=111; // خ
              obj['1581']=112; // ح
              obj['1590']=113; // ض
              obj['1602']=114; // ق
              obj['1587']=115; // س
              obj['1601']=116; // ف
              obj['1593']=117; // ع
              obj['1585']=118; // ر
              obj['1589']=119; // ص
              obj['1591']=120; // ط
              obj['1594']=121; // غ
              obj['1592']=122; // ظ
              obj['1705']=59; // ک
              obj['1662']=92; // پ
              obj['1670']=93; // چ
              obj['1711']=39; // گ
              obj['1608']=44; // و
              if(selfV.CurLang == "latin" && shift){
                 obj['1614']=65; 
                 obj['1573']=66; 
                 obj['1688']=67; 
                 obj['1616']=68; 
                 obj['1613']=69; 
                 obj['1617']=70; 
                 obj['1728']=71; 
                 obj['1570']=72; 
                 obj['93']=73; 
                 obj['1600']=74; 
                 obj['171']=75; 
                 obj['187']=76; 
                 obj['1569']=77; 
                 obj['1571']=78;  
                 obj['91']=79; 
                 obj['92']=80; 
                 obj['1611']=81; 
                 obj['1585']=82; 
                 obj['1615']=83; 
                 obj['1548']=84; 
                 obj['44']=85; 
                 obj['1572']=86; 
                 obj['1612']=87; 
                 obj['1610']=88; 
                 obj['1563']=89; 
                 obj['1577']=90;               
              }
              key = obj[key]?obj[key]:0;
              if(key==0)
                 return;
            }
         }
         if ((key2 == 0)||(key == 8)||(key == 9)){// for opera and firefox
            return;
         }
         if (myEvent.ctrlKey){// for opera and firefox
            return;
         }
         selfV.IsChangeInProgress=false;
         if (key == $.ui.keyCode.ENTER && !EditorId) {
            myEvent.preventDefault();
            myEvent.stopPropagation();
            //self.IsChangeInProgress=true;
            if (self._Chg_Core($CurrObj,true))
               self.NPFocusNext(CurrFullId,CurrOrgId);
            //self.IsChangeInProgress=false;
            return;
         }
         /* this is not require; ControlKeys only occur in keyup
            if ($.inArray(key, self.ControlKeys) != -1) {
                if (ActElemOptions.type == 'Int' || ActElemOptions.type == 'Flt' || ActElemOptions.type == 'Cur')
                    if (key == 45 || key == 46){
                    }
                    else
                        return;
                if (ActElemOptions.type == 'Al'  || ActElemOptions.type == 'ANum' )
                    if (key == 45 || key == 46 || key == 35 || key == 36 || key == 37 || key == 38 || key == 39 || key == 40){
                    }
                    else
                        return;
                if (ActElemOptions.type == 'PDat' || ActElemOptions.type == 'GDat')
                    if (key == 45 || key == 46 || key == keyCode.BACKSPACE){
                    }
                    else
                        return;
                if (ActElemOptions.type == 'Tim')
                    if (key == 45 || key == 46 || key == keyCode.BACKSPACE){
                    }
                    else
                        return;
            }
         */
         var SelVal=$CurrObj.NPSelectionText();
         var Val=$CurrObj.val(),
             SelStart=$CurrObj[0].selectionStart,
             SelEnd=$CurrObj[0].selectionEnd;
         switch (ActElemOptions.Typ) {
         case "Num":
            if ((key < 48 || key > 57)) {
               myEvent.preventDefault();
            }
            break;
         case "Int":
            if (key < 48 || key > 57) {
               if (key==45){ //  -
                  var idx = $CurrObj.val().indexOf('-'); 
                  if (idx == -1){
                     // bayad viewmodel va object har do avaz shavad. 
                     // chon agar dar mavarede kheili jozee be viewmodel haman meghdare ghabli ke dashte ra bedehim, object ra meghdar nemidehad
                     var fv='-' + $CurrObj.val();
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  else{
                     var fv=$CurrObj.val().slice(1);
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
               }
               myEvent.preventDefault();
            }
            break;
         case "Flt":
            if ((key < 48 || key > 57)) {
               if (key==46){//   .
                  if (SelVal.indexOf('.')<0)
                     myEvent.preventDefault();
               }
               else if (key==45){// -
                  var idx = $CurrObj.val().indexOf('-'); 
                  if (idx == -1){
                     var fv='-' + $CurrObj.val();
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  else{
                     var fv=$CurrObj.val().slice(1);
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  myEvent.preventDefault();
               }
               else{
                  myEvent.preventDefault();
               }
            }
            else{
               //var idx = $CurrObj.val().indexOf('.'); 
               //if ((!SelVal)&&(idx > -1) && $CurrObj.val().slice(idx).length > parseInt(ActElemOptions.decimal))
               //   myEvent.preventDefault();
            }
            break;
         case "Cur":
            if ((key < 48 || key > 57)) {
               if (key==45){
                  var idx = $CurrObj.val().indexOf('-'); 
                  if (idx == -1){
                     var fv='-' + $CurrObj.val();
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  else{
                     var fv=$CurrObj.val().slice(1);
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
               }
               myEvent.preventDefault();
            }
            //else {
            //var idx = $.inArray('.', $(this).val());
            //if (idx > -1 && $(this).val().slice(idx).length > parseInt(ActElemOptions.decimal))
            //    myEvent.preventDefault();
            //   var idx = $CurrObj.val().indexOf('.');//$.inArray('.', $CurrObj.val());
            //   if (idx > -1 && $CurrObj.val().slice(idx).length > parseInt(ActElemOptions.decimal))
            //       myEvent.preventDefault();
            //}
            break;
         case "Al":
            if (selfV.CurLang=='farsi'){
               //var fs = ' ~~~~~~گ~~~~و~~~~~~~~~~~~~~ك~~~~~شذزيثبلآهتنمءدخحضقسفعرصطغظجژچ~~پشذزيثبلاهتنمئدخحضقسفعرصطغظ~~~ّ';
               var fs = ' ~~~~~~گ~~~~و~~~~~~~~~~~~~~ك~~~~~شذژيثبلآهتنمءدخحضقس،عرصطغظجپچ~~ژشذزيثبلاهتنمئدخحضقسفعرصطغظ~~~ّ';
               if (!shift && key < 91 && key > 64) key = key + 32;
               if (shift && key < 123 && key > 96) key = key - 32;
               var k = fs.charCodeAt(key - 32);
               if (String.fromCharCode(k) == '~')
                  myEvent.preventDefault();
               else {
                  $CurrObj.insertAtCaret(String.fromCharCode(k));
                  self.ValByKeyboard(CurrOrgId,$CurrObj.val());
                  myEvent.preventDefault();
               }
            }
            else if (selfV.CurLang=='latin'){
               var fs = ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ABCDEFGHIJKLMNOPQRSTUVWXYZ~~~~~~abcdefghijklmnopqrstuvwxyz~~~~';
               var k = fs.charCodeAt(key - 32);
               if (String.fromCharCode(k) == '~')
                  myEvent.preventDefault();
               }
               break;
         case "ANum":
            if (selfV.CurLang=='farsi'){
               var fs = ' ~~~~~~گ~~~~و~~~0123456789~ك~~~~~شذژيثبلآهتنمءدخحضقس،عرصطغظجپچ~~ژشذزيثبلاهتنمئدخحضقسفعرصطغظ~~~ّ';
               if (!shift && key < 91 && key > 64) key = key + 32;
               if (shift && key < 123 && key > 96) key = key - 32;
               var k = fs.charCodeAt(key - 32);
               if (String.fromCharCode(k) == '~')
                  myEvent.preventDefault();
               else {
                  $CurrObj.insertAtCaret(String.fromCharCode(k));
                  self.ValByKeyboard(CurrOrgId,$CurrObj.val());
                  myEvent.preventDefault();
               }
            }
            else if (selfV.CurLang=='latin'){
               var fs = ' ~~~~~~~~~~~~~~~0123456789~~~~~~~ABCDEFGHIJKLMNOPQRSTUVWXYZ~~~~~~abcdefghijklmnopqrstuvwxyz~~~~';
               var k = fs.charCodeAt(key - 32);
               if (String.fromCharCode(k) == '~')
                  myEvent.preventDefault();
               }
            break;
         case "Txt":
         case "SHtm":
         case "Htm":
            if (selfV.CurLang == 'farsi') {
               if (key > 32 && key < 128) {
                  if (!shift && key < 91 && key > 64) key = key + 32;
                  if (shift && key < 123 && key > 96) key = key - 32;
                  var fs = ' !"#$%،گ)(×+و-./0123456789:ك،=.؟@شذژيثبلآهتنمءدخحضقس،عرصطغظجپچ^_ژشذزيثبلاهتنمئدخحضقسفعرصطغظ<|>ّ';
                  var k = fs.charCodeAt(key - 32);
                  if(EditorId){
                     var windo = EditorId.contentWindow || window;
                     var el = windo.document.createElement("div");
                     el.innerHTML = String.fromCharCode(k);
                     if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0) 
                        EditorId.pasteHtmlAtCaret(String.fromCharCode(k), EditorId.contentWindow, EditorId);
                     else 
                        document.execCommand('insertText', false, el.innerHTML)
                  }
                  else
                  {
                     $CurrObj.insertAtCaret(String.fromCharCode(k));
                     self.ValByKeyboard(CurrOrgId,$CurrObj.val());
                  }
                  myEvent.preventDefault();

               }
            }
            if (selfV.CurLang == 'latin') { // برای حالتی که کیبورد فارسی است و میخواهیم لاتین تایپ کنیم
                  if(EditorId){
                      if(key !=13 && key !=32){
                        var windo = EditorId.contentWindow || window;
                        var el = windo.document.createElement("div");
                        el.innerHTML = String.fromCharCode(key);
                        if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0) 
                           EditorId.pasteHtmlAtCaret(String.fromCharCode(key), EditorId.contentWindow, EditorId);
                        else 
                           document.execCommand('insertHtml', false, el.innerHTML)
                        myEvent.preventDefault();
                     }   
                  }
                  else{
                     $CurrObj.insertAtCaret(String.fromCharCode(key));
                     self.ValByKeyboard(CurrOrgId,$CurrObj.val());
                     myEvent.preventDefault();
                  }

            }
            break;
         case "PDat":
         case "GDat":
            if(($CurrObj[0].selectionStart==0)&&($CurrObj[0].selectionEnd==$CurrObj[0].value.length)){
               if ((key < 48 || key > 57)){
                  myEvent.preventDefault();
               }
               else{
                  return;
               }
            }
            if (SelVal.indexOf('\/')>-1)
               myEvent.preventDefault();
            if ($CurrObj.val().length==1){
               if (key==47){
                  $CurrObj.val('\/0'+$CurrObj.val());
                  myEvent.preventDefault();
                  $CurrObj[0].selectionStart=0;
                  $CurrObj[0].selectionEnd=0;
               }
               else if ((key < 48 || key > 57)){
                  myEvent.preventDefault();
               }
               else{
                  Val=Val.substring(0,SelStart)+String.fromCharCode(key)+Val.substring(SelEnd,Val.length);
                  if (Val.length>1){
                     $CurrObj.val('\/'+Val);
                     myEvent.preventDefault();
                     $CurrObj[0].selectionStart=0;
                     $CurrObj[0].selectionEnd=0;
                  }
                  else{
                     //$CurrObj.val(Val);
                  }
               }
            }
            else if($CurrObj.val().length==2){
               if (key==47){
                  $CurrObj.val('\/'+$CurrObj.val());
                  myEvent.preventDefault();
                  $CurrObj[0].selectionStart=0;
                  $CurrObj[0].selectionEnd=0;
               }
               else if (SelVal==''){
                  myEvent.preventDefault();
               }
               else if ((key < 48 || key > 57)){
                  myEvent.preventDefault();
               }
            }
            else if($CurrObj.val().length==3){
               if (SelStart==0&& SelEnd==0){
                  if ((key < 48 || key > 57)){
                     myEvent.preventDefault();
                  }  
               }
               else{
                  myEvent.preventDefault();
               }
            }
            else if($CurrObj.val().length==4){
               if (key==47){
                  $CurrObj.val('\/0'+$CurrObj.val());
                  myEvent.preventDefault();
                  $CurrObj[0].selectionStart=0;
                  $CurrObj[0].selectionEnd=0;
               }
               else if ((key < 48 || key > 57)){
                  myEvent.preventDefault();
               }
               else{
                  $CurrObj.val('\/'+Val.substr(0,1)+String.fromCharCode(key)+Val.substr(1));
                  myEvent.preventDefault();
                  $CurrObj[0].selectionStart=0;
                  $CurrObj[0].selectionEnd=0;
               }  
            }
            //this.selectionStart
            //var s = $(this).val();
            /*var s = $CurrObj.val();
            if ((key < 48 || key > 57)){// || s.length >= 10) {
               myEvent.preventDefault();
            }
            else{
               var m = (s.substr(3, 2) == '') ? 0 : parseFloat(s.substr(3, 2)), da = parseFloat(s.substr(0, 2));
               if (s.length > 7 && s.indexOf("\.") >= 0) {
                  var ta = s.split("\.");
                  if (ta[2].length < 2) 
                     da = 1;
                  else 
                     da = parseFloat(ta[2]);
                  if (ta[1].length < 2) 
                     m = 1;
                  else 
                     m = parseFloat(ta[1]);
               }
               if (s.length > 4 && (m < 1 || m > 12)) {
                  alert('.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود');
                  self.outputMessage = '.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود';
                  myEvent.preventDefault();
                  //$(this).select();
                  $CurrObj.select();
                  return;
               }
               var mi = 0;
               if (s.length > 1 && (da < 1 || da > self.ML[mi][m])) {
                  alert('.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود');
                  self.outputMessage = '.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود';
                  myEvent.preventDefault();
                  //$(this).select();
                  $CurrObj.select();
                  return;
               }
            }*/
            break;
         case "GDat":
                    //var s = $(this).val();
                    /*
                    var s = $CurrObj.val();
                    if ((key < 48 || key > 57) || s.length >= 10) {
                        myEvent.preventDefault();
                    }
                    else {
                        var m = (s.substr(3, 2) == '') ? 0 : parseFloat(s.substr(3, 2)), da = parseFloat(s.substr(0, 2));
                        if (s.length > 7 && s.indexOf("\.") >= 0) {
                            var ta = s.split("\.");
                            if (ta[2].length < 2) da = 1;
                            else da = parseFloat(ta[2]);
                            if (ta[1].length < 2) m = 1;
                            else m = parseFloat(ta[1]);
                        }
                        if (s.length > 4 && (m < 1 || m > 12)) {
                            alert('.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود');
                            self.outputMessage = '.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود';
                            myEvent.preventDefault();
                            //$(this).select();
                            $CurrObj.select();
                            return;
                        }
                        var mi = 1;
                        if (s.length > 1 && (da < 1 || da > self.ML[mi][m])) {
                            alert('.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود');
                            self.outputMessage = '.تاريخ وارد شده صحيح نمي باشد، تاريخ بايد بصورت روز، ماه، سال وارد گردد\n.همچـنين  روز  و  ماه  و  سـال  بايد  در  محدوده  معني دار قرار داشته باشد\n\n.مثلا  تـاريخ 1380/1/2  بـايد به صورت  02 سپـس 01 و بعد 1380  وارد شـود';
                            myEvent.preventDefault();
                            //$(this).select();
                            $CurrObj.select();
                            return;
                        }
                    }*/
            break;
         case "Tim":
            //var s = $(this).val();
            var s = $CurrObj.val();
            if ((key < 48 || key > 57) ){//|| s.length >= 5) {
               myEvent.preventDefault();
            }
            else{
            }
            break;
         case "Url":
            break;
         case "Email":
            break;
         case "Let":
            //var s = $(this).val();
            var s = $CurrObj.val();
            if (s.length >= 8) {
               myEvent.preventDefault();
            }
            break;
         case "StdNo":
            if ((key < 48 || key > 57)) {
               myEvent.preventDefault();
            }
            else {
               var s = $CurrObj.val();
               if (s.length >= LengthOfStudentNo) {
                  myEvent.preventDefault();
               }
            }
            break;
         case "SSNo":
            if ((key < 48 || key > 57)) {
               myEvent.preventDefault();
            }
            break;
         };//switch (ActElemOptions.type) {
      },
      _KeyDown:function(myEvent,$CurrObj){
         var self = this, e = self.element, op = self.options;
         var CurrOrgId=$CurrObj.data('orgid');
         var selfV=self.Valid_;
         var key;
         var keyCode = $.ui.keyCode;
         key = (myEvent.keyCode ? myEvent.keyCode : myEvent.which);
         if(key == 8 && $CurrObj.val() == "" && self.BackSpaceFocus){
            $("r>n[Nex="+CurrOrgId+"]",$(self.$ValidXml)).each(function(i,v){
               var $v=$(v);
               /*
               if($(v).attr("Typ") == 'Cmp'){
                  $('[orgid='+$(v).attr("id")+']').find('[data-bind]:visible:last').focus();
                  return;
         
               }
               */
               if($v.attr("Typ") != 'HLnk' && $v.attr("Typ") != 'DLbl' && !$v.attr("MSAutoC")
                  && self.W_.FrmFld[$v.attr("id")].Enable){
                  //$('[orgid='+$(v).attr("id")+']').focus();
                  self.W_.FrmFld[$v.attr("id")].Elem.focus(); 
                  myEvent.preventDefault();
                  return false;
               }                
            });
          }
          self.BackSpaceFocus = false;
      
      },
      _KeyUp:function(myEvent,$CurrObj){
         var self = this, e = self.element, op = self.options;
         var CurrOrgId=$CurrObj.data('orgid');
         var CurrFullId=$CurrObj.attr('id');
         self.BackSpaceFocus=true;
         window.clearTimeout(self.BackSpaceTimer);   
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return;
         var selfV=self.Valid_;
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
         var key, shift;
         var keyCode = $.ui.keyCode;
         key = (myEvent.keyCode ? myEvent.keyCode : myEvent.which);
         shift = myEvent.shiftKey;
         if (key == keyCode.ESCAPE) {
            return;
         }
         if (key == 13) {
            return;
         }
         //if(key != 9)
         //   GlobViewModel.LangShow.hide();
         if (key == 17){// keyCode.CONTROL) {//Ctrl has pressed
            if (ActElemOptions.Lan == "3") {
               switch (selfV.CurLang) {
                  case 'farsi':{
                     selfV.CurLang = 'latin';
                     break;
                  }
                  case 'latin':{
                     selfV.CurLang = 'farsi';
                     break;
                  }
                  default:{
                     selfV.CurLang = 'farsi';
                     break;
                  }
               }
               /*$("r>n[id="+CurrOrgId+"]",$(self.$ValidXml))
               .attr('CurLang',selfV.CurLang);*/
               ActElemOptions.CurLang=selfV.CurLang;
              
            }
            var el = $(myEvent.currentTarget);
            if((el[0].type == "text" || el[0].type == "textarea") && !el.attr("readonly")){
               var Type = (self.W_ && self.W_.FrmFld && self.W_.FrmFld[el.attr('orgid')]) ? self.W_.FrmFld[el.attr('orgid')].Type : "";
               var PreventShowLanguage = (Type == 'Int' || Type == 'StdNo' || Type == 'PDat' || Type == 'GDat' || Type == 'SSNo' || Type == 'Flt' || Type == 'Tim' || orgid == undefined);                     
               if(PreventShowLanguage )   
                  GlobViewModel.LangShow.hide()
               else  
                  GlobViewModel.LangShow.show().text((selfV.CurLang == "farsi") ? "FA" : "EN");
            }
            
            window.clearTimeout(self.LangTimer);
            self.LangTimer = setTimeout(function(){    
               GlobViewModel.LangShow.hide();
            }, 1000);
            myEvent.preventDefault();
            return;
         }
         switch (ActElemOptions.Typ) {
            case "Num":
               break;
            case "Int":
               /* in ghesmat dar keypress piade shod ke beine mosbat va manfi switch mikonad
               if ($CurrObj.val().length == 0)
                       if (key == 109 || key == 189){
                            //$CurrObj.val('-' + $CurrObj.val());
                            eval('op.npform.ViewModel.'+CurrOrgId+'("'+ '-' + $CurrObj.val()+'");');
                  }                                 
                        else if (key == 107 || key == 187){
                            //$CurrObj.val('+' + $CurrObj.val());
                            eval('op.npform.ViewModel.'+CurrOrgId+'("'+ '+' + $CurrObj.val()+'");');
                  }
                  */
               break;
            case "Flt":
               if (($CurrObj.val().indexOf('.') == -1) && (key == keyCode.PERIOD || key == keyCode.NUMPAD_DECIMAL)) {
                  if ($CurrObj.val().length == 0 || ($CurrObj.val().length == 1 && ($CurrObj.val() == '-' || $CurrObj.val() == '+'))){
                     var fv=$CurrObj.val() + '0.';
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  else{
                     var fv=$CurrObj.val() + '.';
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
               }
               break;
            case "Al":
               break;
            case "ANum":
               break;
            case "Txt":
               break;
            case "PDat":
            case "GDat":
               if ((key > 47 && key < 58) || (key > 95 && key < 106)) {
                        var s = $CurrObj.val();
                        if (s.length == 4 || s.length == 6) {
                           //var fv=s + '/';
                           //$CurrObj.val(fv);
                           //op.npform.Val(CurrOrgId,fv);
                              
                        }
               }
               break;
            /*case "GDat":
               break;*/
            case "Tim":
               if ((key > 47 && key < 58) || (key > 95 && key < 106)) {
                  var s = $CurrObj.val();
                  if (s.length == 2) {
                     var fv=s + ':';
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
                  else if (s.length > 2 && $.inArray(':', s) == -1) {
                     var fv=s.slice(0, 2) + ':' + s.slice(2);
                     self.ValByKeyboard(CurrOrgId,fv);
                  }
               }
               break;
            case "Url":
               break;
            case "Email":
               break;
            case "Cur":
               if ((key > 47 && key < 58) || (key > 95 && key < 106) ||
                   (key == keyCode.BACKSPACE) || (key == keyCode.DELETE)) {
                  var s = $CurrObj.val().replace(/,/g, '');
                  var so = "";
                  for (var j = 1, i = s.length - 1; i > -1; i--, j++) {
                     if (j > 1 && (j - 1) % 3 === 0) {
                        so = ',' + so;
                     }
                     so = s[i] + so;
                  }
                  self.ValByKeyboard(CurrOrgId,so);
               }
               break;
            case "Let":
               var s = $CurrObj.val();
               if (s.length == 2) {
                  self.ValByKeyboard(CurrOrgId,s+'.');
               }
               break;
            case "StdNo":
               break;
            case "SSNo":
               break;
         }
         if ((ActElemOptions.Max)||(ActElemOptions.Dec)){
            var fv,s;
            switch (ActElemOptions.Typ){
               case 'Cur':{
                  s = $CurrObj.val().replace(/,/g, '');
                  break;             
               }
               case 'PDat':
               case 'GDat':{
                  s = $CurrObj.val().replace(/\//g, '').replace(/\./g, '');
                  break;            
               }
               case 'Tim':{
                  s = $CurrObj.val().replace(/:/g, '');
                  break;            
               }
               default:{
                  s = $CurrObj.val();
               }
            }
            var FocusToNext=false;
            if (ActElemOptions.Dec&&(s.indexOf('.')>0)&&
                  ((s.length-s.indexOf('.')>ActElemOptions.Dec+2)
                     ||((s.length-s.indexOf('.')==ActElemOptions.Dec+1)
                        &&(key !==13)&&($.inArray(key, selfV.ControlKeys) == -1))
                  )
               ){
               s = s.substring(0,s.indexOf('.')+ActElemOptions.Dec+1);
               //FocusToNext=true;
               self.ValByKeyboard(CurrOrgId,s);
               self.NPFocusNext(CurrFullId,CurrOrgId);
            }
            if ((ActElemOptions.Max))
            if ((s.length>ActElemOptions.Max) 
               ||((s.length == ActElemOptions.Max)
                     &&($.inArray(key, selfV.ControlKeys) == -1)//prevent jump by control key
                     &&(key !==13)// prevent double jump by return key
                  )
               )
            {
               //FocusToNext=true;
               if (s.length>ActElemOptions.Max){
                  s = s.slice(0,ActElemOptions.Max);
                  self.ValByKeyboard(CurrOrgId,s);
               }
               self.NPFocusNext(CurrFullId,CurrOrgId);
            }
            //if (FocusToNext){
            //   self.ValByKeyboard(CurrOrgId,s);
            //   self.NPFocusNext(CurrFullId,CurrOrgId);
            //}//end if (s.length>=ActElemOptions.max){
         }//end if (ActElemOptions.max>0){
         
            
      },
      GetValidationAttr: function (CurrOrgId,AttrName) {
         var self=this,
            op=self.options,
            RetVal;
         $("r>n[id="+CurrOrgId+"]",$(self.$ValidXml))
         //.add($("r>n>d>n[id="+CurrOrgId+"]",$(self.$ValidXml)))
         .each(
            function(i,v){
               RetVal=$(v).attr(AttrName);
            });
         if (!RetVal){
            RetVal='';
         }
         return RetVal;
      },
      _Chg_Core: function ($CurrObj,DontRunOnCh) {
         var self = this, e = self.element, op = self.options;
         var CurrOrgId=$CurrObj.data('orgid');
         var CurrFullId=$CurrObj.attr('id');
         var selfV=self.Valid_

         var fv,
             lastfv,
             formatedv,
             IsRadio=false;
         if ($CurrObj.is('input:radio')||$CurrObj.is('input:checkbox')){
            IsRadio=true;
            //fv=$CurrObj.prop('checked');            
         }
         else{
            fv=$CurrObj.val();
         }
         if (typeof CurrOrgId==="undefined"){
            CurrOrgId=$CurrObj.attr('name');
            if (typeof CurrOrgId !=="undefined"){
               IsRadio=true;
               CurrOrgId=self.MakeOrgId(CurrOrgId);
            }
         }
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return 0;
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
   
         if (ActElemOptions.OnAC){//this is autocomplete
            $CurrObj.npAutoComplete('call_change');
            //call_change for first select one value in autocomplete
         }             
         if (IsRadio){
            if ($CurrObj.is('input:radio'))
               self.ValByKeyboard(CurrOrgId,$CurrObj.val());
         }
         else if (self.CheckVal(CurrFullId,CurrOrgId,fv,true)>0){ //isfocused use in on change that show focus is in this element
            lastfv=$CurrObj.val();
            formatedv = self.NPFormat(CurrFullId,CurrOrgId,self.NPFix(CurrFullId,CurrOrgId,fv));
            if (lastfv!=formatedv){ 
               self.ValByKeyboard(CurrOrgId,fv);
            }
            else{
               //op.npform.Val(CurrOrgId,fv);
            }
         }
         else{
            return 0;//new on 940407 by taebi
         }
         if (CurrOrgId !== selfV.ActElemId)
            return 1;
         if ((!DontRunOnCh)&&(ActElemOptions.OnCh!= "")){ 
            self._trigger(ActElemOptions.OnCh);
         }
         return 1;
      },
      _Chg: function (myEvent,$CurrObj) {//onchange myEvent
         var self = this, e = self.element, op = self.options;
         var CurrOrgId=$CurrObj.data('orgid');
         var CurrFullId=$CurrObj.attr('id');
         var selfV=self.Valid_
         if (CurrOrgId){
            
            $("r>n[id="+CurrOrgId+"]>s",$(self.$ValidXml))
            .each(
               function(i,v){
                  var $v=$(v), TempSonId;
                  if (TempSonId=$(v).attr('id')){
                     self.Val(TempSonId,'');
                  }
               }
            );
         };
         if (self.IsBindingInProgress){
             return false;
         }
         if (selfV.IsChangeInProgress == true)
            return; 
         if (CurrOrgId){
            var ThisFrmFld=self.W_.FrmFld[CurrOrgId];
            if (ThisFrmFld&&!ThisFrmFld.Enable){
               self.ViewModel[CurrOrgId](ThisFrmFld.Val);
               //self.Val(CurrOrgId,ThisFrmFld.Val);
            }
         }
         var key, shift;
         var keyCode = $.ui.keyCode;
         key = (myEvent.keyCode ? myEvent.keyCode : myEvent.which);
         shift = myEvent.shiftKey;
         if (key == keyCode.ENTER) {
            return false;
         }
         if (($CurrObj.prop('tagName') == 'INPUT')&&
            (($CurrObj.prop('type') =='text'))||($CurrObj.prop('type') =='checkbox')){
            //rem this, because this occur in blur
            //un rem because delete occur in blur
            self._Chg_Core($CurrObj); 
         }
         else{
            self._Chg_Core($CurrObj);
         }
         return true;
      },
        
      _Trim: function ($CurrObj) {
         $CurrObj.val($CurrObj.val.replace(/(^\s*)|(\s*$)/g, ""));
         return $CurrObj.val;
      },
      _Rem_Extra: function ($CurrObj) {//Remove Extra Character(fillChar) Before Or After n
         /*var self = this, e = self.element, op = self.options;
         var selfV=self.Valid_

         var n = $CurrObj.val;
         if (ActElemOptions.Fil == "") return n;
         var fillChar = ActElemOptions.Fil;
         var align = ActElemOptions.Jus;
         var s = n;
         var l = s.length;
         if (align == 'R') {
            for (var i = 0; i < l; i++) {
               if (s.charAt(i) != fillChar) break;
            }
            ActElemOptions.val(s.substr(i));
            return (s.substr(i));
         }
         if (align == 'L') {
            for (var i = l - 1; i >= 0; i--) {
               if (s.charAt(i) != fillChar) break;
            }
            ActElemOptions.val(s.substring(0, i + 1));
            return (s.substring(0, i + 1));
         }
         */
      },
      _Mell: function (v) {
         if (v.length == 0)
            return true;
         else if (v.length == 10) {
                if (v == '1111111111' || v == '0000000000' || v == '2222222222' || v == '3333333333' || v == '4444444444' || v == '5555555555' || v == '7777777777' || v == '8888888888' || v == '9999999999')
                    return false;
                else if (v.charAt(0) == '0' && v.charAt(1) == '0' && v.charAt(2) == '0' && v.charAt(3) == '0' && v.charAt(4) == '0' && v.charAt(5) == '0' && v.charAt(6) == '0')
                    return false;
                else {
                    c = parseInt(v.charAt(9));
                    n = parseInt(v.charAt(0)) * 10 + parseInt(v.charAt(1)) * 9 + parseInt(v.charAt(2)) * 8 + parseInt(v.charAt(3)) * 7 + parseInt(v.charAt(4)) * 6 + parseInt(v.charAt(5)) * 5 + parseInt(v.charAt(6)) * 4 + parseInt(v.charAt(7)) * 3 + parseInt(v.charAt(8)) * 2;
                    r = n - parseInt(n / 11) * 11;
                    if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r))
                        return true;
                    else
                        return false;
                }
            }
            else 
                return false;
      },
      _EmailCheck: function (emailStr) {
         return true;
      },
      /*_EmailCheck: function (emailStr) {
         var checkTLD = 1;
         var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
         var emailPat = /^(.+)@(.+)$/;
         var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
         var validChars = "\[^\\s" + specialChars + "\]";
         var quotedUser = "(\"[^\"]*\")";
         var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
         var atom = validChars + '+';
         var word = "(" + atom + "|" + quotedUser + ")";
         var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
         var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");

         var matchArray = emailStr.match(emailPat);
         if (matchArray == null) {
            return false;
         }
         var user = matchArray[1];
         var domain = matchArray[2];
         for ( i = 0; i < user.length; i++) {
            if (user.charCodeAt(i) > 127) {
               return false;
            }
         }
         for ( i = 0; i < domain.length; i++) {
            if (domain.charCodeAt(i) > 127) {
               return false;
            }
         }

         if (user.match(userPat) == null) {
            return false;
         }

         var IPArray = domain.match(ipDomainPat);
         if (IPArray != null) {
            for (var i = 1; i <= 4; i++) {
               if (IPArray[i] > 255) {
                  return false;
               }
            }
            return true;
         }
         var atomPat = new RegExp("^" + atom + "$");
         var domArr = domain.split(".");
         var len = domArr.length;

         for ( i = 0; i < len; i++) {
            if (domArr[i].search(atomPat) == -1) {
               return false;
            }
         }
         if (checkTLD && domArr[domArr.length - 1].length != 2 && domArr[domArr.length - 1].search(knownDomsPat) == -1) {
            return false;
         }

         if (len < 2) {
            return false;
         }
         return true;
      },*/
      NPFix: function (CurrFullId,CurrOrgId,v) {
         var self = this, e = self.element, op = self.options;
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return v;
         var selfV=self.Valid_
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;

         var fv=v;
         //trim prevent type space 
         //fv=$.NPTrim(fv);//new 930923
         switch (ActElemOptions.Typ) {
            case "PDat" :
            case "GDat" :{
               fv= $.NPTrim(fv.replace(/\//g, '').replace(/\./g, ''));
               /*var myD='00',myM='00',myY='0000',fv2;
               if(fv.indexOf("/")>=0){
                  myD=fv.substr(0,fv.indexOf("/"));
                  if((myD.length>2)||(myD.length==0)) {myD='00';}
                  else if (myD.length==1){myD='0'+myD;}
                  fv=fv.substr(fv.indexOf("/")+1,fv.length);
                  if(fv.indexOf("/")>=0){
                     myM=fv.substr(0,fv.indexOf("/"));
                     if((myM.length>2)||(myM.length==0)) {myM='00';}
                     else if (myM.length==1){myM='0'+myM;}
                     fv=fv.substr(fv.indexOf("/")+1,fv.length);
                     myY=fv;
                     if((myY.length>4)||(myY.length==0)) {myY='0000';}
                     else if (myY.length==1){myY='130'+myY;}
                     else if (myY.length==2){myY='13'+myY;}
                     else if (myY.length==3){myY='0'+myY;}
                  }
                  
                  fv=myY+myM+myD;
               }*/
               break;
            }
           /* case "GDat" :{
               break;
            }*/
            case "Tim" :{
               fv= $.NPTrim(fv.replace(/\:/g, ''));
               //var pos=fv.indexOf(":");
               //while(pos>=0){
               //   fv=fv.substr(0,pos)+fv.substr(pos+1,fv.length);
               //   pos=fv.indexOf(":");
               //}
               break;
            }
            case "Let":{//letterNo
               if (v.indexOf(".") >= 0) 
                  fv=(v.substr(0, 2) + v.substr(3));//control mikhaahad
               break;
            }
            case "Cur":{//currency
                fv = (v.replace(/,/g, ''));
                break;
            }
            default:{
               if (typeof(v)=='boolean'){//not requie ==(check box handled by npcb in knockout)
                  if (v) 
                     fv='1'; 
                  else 
                     fv='0';
               }
               if (v && ActElemOptions.Fil != '' && v!=''){// shart v bayad control shavad
                  var len = parseFloat(ActElemOptions.Max);
                  var fillChar = ActElemOptions.Fil;
                  var align = ActElemOptions.Jus;
                  if (v.length < len) {
                     var s = '';
                     for (i = 0; i < (len - v.length); i++) {
                        s = s + fillChar;
                     }
                     fv=(align == 'L')?(v + s):(s + v);
                  }
               }
            }//default
         }//switch (ActElemOptions.type)
          //$CurrObj.val(fv);
          return(fv);
      },
      NPFormat:function(CurrFullId,CurrOrgId,v){
         var self = this, e = self.element, op = self.options;
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return v;
         var selfV=self.Valid_
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
         var fv=v;
         //trim prevent type space
         //fv=$.NPTrim(fv);//new 930923
         switch (ActElemOptions.Typ) {
            // baraye baghiyeye type ha az function getval dar validation.htc bayad convert kard
            case "PDat" :
            case "GDat" :{
               fv= fv.replace(/\//g, '');
               fv= fv.replace(/\./g, '');
               //fv=(fv)?fv.substr(6,2)+'/'+fv.substr(4,2)+'/'+fv.substr(0,4):'';
               if (fv.length==6)
                  fv='13'+fv;
               fv=(fv)?fv.substr(0,4)+'/'+fv.substr(4,2)+'/'+fv.substr(6,2):'';
               break;                    
            }
            case "Tim" :{
               fv= fv.replace(/\:/g, '');
               fv=fv?fv.substr(0,2)+':'+fv.substr(2,2):'';
               break;                    
            }
            //case "GDat" :{
            //case "Tim" :{
                //case "Let"://letterNo
                //default ===> delete fillchar
            case "Cur":{//currency
               var s = fv.replace(/,/g, '');
               var so = "";
               for (var j = 1, i = s.length - 1; i > -1; i--, j++) {
                  if (j > 1 && (j - 1) % 3 === 0) {
                     so = ',' + so;
                  }
                  so = s.substr(i,1) + so;
               }
               fv=so;
               break;
            }
         }    
         return fv;
      },
      CheckVal:function(CurrFullId,CurrOrgId,v,isfocused,OtherParam){
         var self = this, e = self.element, op = self.options;
         if (!CurrOrgId || !self._SetCurrValidationData(CurrOrgId))
            return -1;
         var errmsg;
         var selfV=self.Valid_
         var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
         var Req=self.W_.FrmFld[CurrOrgId].Req;//ActElemOptions.Req;
         //if ((OtherParam)&&(OtherParam.Req))
         //   Req=OtherParam.Req;//=='1'?true:false;
         var FieldValue = self.NPFix(CurrFullId,CurrOrgId,v);
         if (ActElemOptions.MSAutoC){
            var MSVar= '';
            MSVar=self.Val(ActElemOptions.MSAutoC);
            //self._SetCurrValidationData(CurrOrgId); 
            MSVar = $("row",MSVar).length;
            if (( MSVar==0) && Req=='1' ){//self.W_.FrmFld[CurrOrgId].Req=='1') {
               errmsg="مقدار معتبری انتخاب نشده است";
               self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
               isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
               return -1;
            }  
         } 
         var IsEmpty=false;
         var myAct=self.W_.FrmFld[CurrOrgId].Act;
         if(myAct){
            var Relfields = self.Acts[myAct].relfield ? eval(self.Acts[myAct].relfield) : [];
            $(Relfields).each(function(i,v){
            if(self.Val(v[0])=='' && self.W_.FrmFld[v[0]].Req == '1' && self.W_.FrmFld[v[0]].Enable)
               IsEmpty = true;     
            })
         }
         
         if ((typeof(FieldValue)!=='boolean')&&(!FieldValue)){//((FieldValue == "")) {
            if (Req=='1' && !ActElemOptions.MSAutoC) {
               errmsg=ActElemOptions.Cap + " " + "نمي تواند خالي باشد";
               self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
               isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
               return -1;
            }
         }
         else{ 
            if (myAct && IsEmpty && Req=='1'){
               errmsg="مقدار معتبری انتخاب نشده است";
               self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
               isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
               return -1;
            }  

            if (ActElemOptions.Min != ""){
               if (FieldValue.length < parseFloat(ActElemOptions.Min)) {
                  errmsg='طول"' + ActElemOptions.Cap + '" نمي تواند کمتر از  ' + ActElemOptions.Min + ' کاراکتر باشد';
                  self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                  isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                  return -1;
               }
            }
            var p = ActElemOptions.Typ;
            switch (p) {
               case "SSNo":
               {
                  var s = FieldValue.replace(/(\/)/g, '');
                  if (!(self._Mell(s))) {
                     errmsg=ActElemOptions.Cap + " نامعتبر است";
                     self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                     isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                     return -1;
                  }
                  break;
               }
               case "Email":
               {
                  var s = FieldValue.replace(/(\/)/g, '');
                  s = s.toLowerCase();
                  //$(this).val = s; //mohem/////////////////////////////////////////////////////////////
                  if (!(self._EmailCheck(s))) {
                     errmsg=ActElemOptions.Cap + " نامعتبر است";
                     self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                     isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                     return -1;
                  }
                  break;
               }
               case "StdNo":
               {
                  if (FieldValue.length > LengthOfStudentNo) {
                     errmsg=ActElemOptions.Cap + " نامعتبر است";
                     self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                     isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                     return -1;
                  }
                  break;
               }
            }//end of switch (p)
            if ($.inArray(ActElemOptions.Typ ,["Num","Int","Cur","Flt"])!=-1) {
            if (isNaN(FieldValue)) {
               errmsg=ActElemOptions.Cap + " " + "نمي تواند غير عددي باشد";
               self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
               isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
               return -1;
            }
            if (ActElemOptions.Dec != "") {
               if (((FieldValue.length - FieldValue.indexOf(".") - 1) > parseInt(ActElemOptions.Dec)) && (FieldValue.indexOf(".") >= 1)) {
                  errmsg=ActElemOptions.Cap + '" نمي تواند بيش از ' + ActElemOptions.Dec + ' رقم اعشار داشته باشد"';
                  self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                  isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                  return -1;
               }
            }
            if (ActElemOptions.Fro != ""){
               if (FieldValue < parseFloat(ActElemOptions.Fro)) {
                  errmsg=ActElemOptions.Cap + '" نمي تواند کوچکتر از  ' + ActElemOptions.Fro + ' باشد"';
                  self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                  isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                  return -1;
               }
            }
            if (ActElemOptions.To != ""){
               if (FieldValue > parseFloat(ActElemOptions.To)) {
                  errmsg=ActElemOptions.Cap + '" نمي تواند بزرگتر از ' + ActElemOptions.To + ' باشد"';
                  self._ShowError(CurrFullId,CurrOrgId,errmsg, isfocused);
                  isfocused&&self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
                  return -1;
               }
            }
            }
         }// esle if (FieldValue == "") {
         self._ShowError(CurrFullId,CurrOrgId,'', false);
         return 1;

      },
      ShowError: function(CurrFullId,CurrOrgId,errmsg,isfocused){
           this._ShowError(CurrFullId,CurrOrgId,errmsg,isfocused);
      },
      _ShowError: function(CurrFullId,CurrOrgId,errmsg,isfocused){
         //tooltip in IE7-10 has a bug for select, so we tooltip on a span that wrap the select in generator
         var self=this;
         var $TooltipOver,$CurrObj2,
             FrmFldOfObj=self.W_.FrmFld[CurrOrgId],
             ElemTooltipOverlay=FrmFldOfObj.ElemTooltipOverlay,
             $CurrObj1=FrmFldOfObj.Elem;//$('#'+CurrFullId,$(self.FormDiv));// bayad object ra dar div khodash jost va joo konad
         /* Added By S.J */
         if(self.W_.FrmFld[CurrOrgId] && self.W_.FrmFld[CurrOrgId].Type == "SHtm")
            $CurrObj1 = ($CurrObj1.siblings("div")) ? $CurrObj1.siblings("div") : $CurrObj1 ; 
         /* Added By S.J */  
         if (!$CurrObj1 ||!$CurrObj1.length)
            return;
         if (!ElemTooltipOverlay){
            var x=$CurrObj1;
            if (self.W_.FrmFld[CurrOrgId].ElemReqPar){
               x=self.W_.FrmFld[CurrOrgId].ElemReqPar;   
            }
            var y=x.parent();
            if (y.is('span')){
               ElemTooltipOverlay=y;
            } 
            else{
               ElemTooltipOverlay=$CurrObj1;
            }
            FrmFldOfObj.ElemTooltipOverlay=ElemTooltipOverlay;
         }
         var LastNpTitAttr='';
         if (errmsg == ''){
            LastNpTitAttr=FrmFldOfObj.lastnptitle||'';//$CurrObj1.attr('lastnptitle') || '';
            //LastNpTitAttr=$CurrObj1.attr('lastnptitle') || '';
            if ((LastNpTitAttr !=='')){
               if ((LastNpTitAttr =='*'))
                  LastNpTitAttr='';
               ElemTooltipOverlay.tooltip("destroy");
               ElemTooltipOverlay.attr('title',LastNpTitAttr);

               FrmFldOfObj.lastnptitle='';
            }
            return;
         }
         LastNpTitAttr=FrmFldOfObj.lastnptitle||'';//$CurrObj1.attr('lastnptitle')|| '';
         if (LastNpTitAttr!==''){
            //this field is in error state
            ElemTooltipOverlay.tooltip("destroy");
         }
         else{
            LastNpTitAttr=$CurrObj1.attr('title') || '';
            if (LastNpTitAttr=='')
               LastNpTitAttr='*'; // this mean that title was null and error message is occur and title was changed 
            //$CurrObj1.attr('lastnptitle',LastNpTitAttr);
            FrmFldOfObj.lastnptitle=LastNpTitAttr;
         }
         /*$CurrObj2=$CurrObj1;
         if ($CurrObj2.is('select')){
            if ($CurrObj2.parent().is('span.npRquire')){
               $CurrObj2=$CurrObj2.parent();
            }            
            if ($CurrObj2.parent().is('span')){
               $TooltipOver=$CurrObj2.parent();
            }
            else{
               $TooltipOver=$CurrObj1;// this form is last generated and have not span over select
            }
         }
         else{
            $TooltipOver=$CurrObj1;
         }*/
         $TooltipOver=ElemTooltipOverlay;
         $TooltipOver.attr('title',errmsg);
         $TooltipOver.tooltip({ //content:errmsg , 
            tooltipClass:'ui-state-error',
            position: {
               my: "center bottom-5",
               at: "center top"
            }
         });
         //NPSetFocus must call from source because sometimes we many error. and NPSetFocus must call for first error
         //self.NPSetFocus(CurrFullId,CurrOrgId,false,isfocused);
      },
      NPFocusNext: function (CurrFullId,CurrOrgId,$LastObj) {
         //another syntax is NPFocusNext('Cmp',$LastObj)
         var self = this, e = self.element, op = self.options;
         var selfV=self.Valid_

         var $NextObj,
             FirstItem=false;
         if (CurrFullId=='Cmp'){
            $LastObj=CurrOrgId;
            //get first elem of this component at nextact validation
            CurrOrgId=$("r>com>act[id='"+self.NextAct+"']>mod[id='"+self.FMod+"']>f:eq(0)", self.$ValidXml).attr('id');
            FirstItem=true;// use this item instead of nex of this
            if (CurrOrgId){
               CurrFullId=self.MakeFullId(CurrOrgId);
            }
            else{
               return false;
            }
         }
         else{
            $LastObj=$LastObj?$LastObj:self.W_.FrmFld[CurrOrgId].Elem;
            $LastObj.blur();//
         }
         //var $LastObj=$('#'+CurrFullId,$(self.FormDiv));
         var counter=0;

         while (counter<500){
            if(!self._SetCurrValidationData(CurrOrgId)) 
               return;
            var ActElemOptions=self.W_.FrmFld[CurrOrgId].Valid;
            if (!FirstItem)
               CurrOrgId=ActElemOptions.Nex;
            FirstItem=false;
            if (!CurrOrgId){
               if (op.ParentCmp){
                  CurrFullId=e.parent().prop('id');
                  CurrOrgId=op.ParentCmp.MakeOrgId(CurrFullId);
                  op.ParentCmp.NPFocusNext(CurrFullId,CurrOrgId,$LastObj);
                  return;
               }
               else{
                  return;
               }
            }
            if (CurrOrgId==='Com'){
               //focus on buttons
               $('button:visible', self.W_.$dvfrmFooter).each(function(i,v){
                  var $v=$(v);
                  if (!$v.npButton("option", "disabled")){
                     $v.focus();//.click();
                     return false;
                  }
               });
               return;
            }
            CurrFullId=self.MakeFullId(CurrOrgId);
            //$NextObj=$('#'+CurrFullId,$(self.FormDiv));
            $NextObj=self.W_.FrmFld[CurrOrgId].Elem;
            if ($NextObj.length<1)
               return;
            if (!self.W_.FrmFld[CurrOrgId].Enable||(self.W_.FrmFld[CurrOrgId].Type=='DLbl')||$NextObj.prop('disabled')||($NextObj.css('display')=='none')||$NextObj.attr('readonly')
                ){
               
            }else{
               break;
            }
            counter++;
         }
         if (counter>498){
            return;            
         }
         try{
             
            if (self.W_.FrmFld[CurrOrgId]&&(self.W_.FrmFld[CurrOrgId].Type=='Cmp')){
               var Elem=self.W_.FrmFld[CurrOrgId].Elem;
               if (self.W_.FrmFld[CurrOrgId].WidgetSelf.NPFocusNext('Cmp',$LastObj))
                  return true;   
            }
            switch ($NextObj.prop("tagName").toUpperCase()){
               case 'BUTTON':
               case 'SPAN':
               case 'IMG':{
                  //$LastObj.blur();// run this line before
                  $NextObj.focus();
                  $NextObj.click();   
                  break;
               }
               case 'INPUT':{
                  //self.IsChangeInProgress=true; // for prevent run onchange
                  //$LastObj.blur();
                  //self.IsChangeInProgress=false;
                  $NextObj.focus();
                  $NextObj.select();
                  break;
               }
               case 'SELECT':{
                  //$LastObj.blur();
                  $NextObj.focus();
                  //$NextObj.select();
                  break;
               }
            }       
         }
         catch(e){
            
         }
         return true;
      },
      NPSetFocus: function (CurrFullId,CurrOrgId,NoErr,isfocused) {
         var self=this,
             e = self.element,
             FormDivId=$(self.FormDiv).attr('id'),
             $CurrObj;//=$('#'+CurrFullId,$('#'+FormDivId));
         if (CurrOrgId && self.W_.FrmFld[CurrOrgId]){
            $CurrObj=self.W_.FrmFld[CurrOrgId].Elem;
         }
         else{
            $CurrObj=$('#'+CurrFullId,self.W_.$bod);
            /* Added By S.J */
            CurrOrgId = $CurrObj.attr('orgid')
            /* Added By S.J */    
         }
         if(self.W_.FrmFld[CurrOrgId] && self.W_.FrmFld[CurrOrgId].Type == "SHtm")
            $CurrObj = ($CurrObj.siblings("div")) ? $CurrObj.siblings("div") : $CurrObj ;
            
         if (!NoErr){
            $CurrObj.addClass('ui-state-error');
            //setTimeout("try{var CurrFullId='"+CurrFullId+"'; var $CurrObj=$('#'+CurrFullId,$('#"+FormDivId+"')); $CurrObj.removeClass('ui-state-error');}catch(e){}",300);
            setTimeout(function(){
               $CurrObj.removeClass('ui-state-error');
            },300);
         }
         else{
            $CurrObj.addClass('ui-state-highlight');
            //setTimeout("try{var CurrFullId='"+CurrFullId+"'; var $CurrObj=$('#'+CurrFullId,$('#"+FormDivId+"')); $CurrObj.removeClass('ui-state-highlight');}catch(e){}",300);
            setTimeout(function(){
               $CurrObj.removeClass('ui-state-highlight');
            },300);
         }

         if ($CurrObj.prop('disabled')) {
            this.NPFocusNext(CurrFullId,CurrOrgId);
         }
         else{
            try{
               if (!isfocused){
                  switch ($CurrObj.prop("tagName").toUpperCase()){
                     case 'DIV':{
                        $('input:eq(0)',$CurrObj).focus();
                        break;
                     }
                     default:{
                        $CurrObj.focus();
                        $CurrObj.select();
                        break;
                     }
                  }
               }
               else{
                  /* $.fn.focus(delay) deprecated in jqui-1.11.0
                   * $CurrObj.focus(1);
                   */
                  setTimeout(function(){
                     $CurrObj.focus();
                  },1);
               }
            }
            catch (er) { }
         }
         return 1;
      }
   });
})(jQuery);
//npvalidation.js
(function($){
   $.fn.pasteHtmlAtCaret=function (html,windo,editor) {
      windo = windo || window;
      var sel, range;
      if (windo.getSelection) {     
         // IE9 and non-IE
         sel = windo.getSelection();
         if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = windo.document.createElement("div");
            el.innerHTML = html;
            var frag = windo.document.createDocumentFragment(), node, lastNode;
   
            while ( (node = el.firstChild) ) {
               lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
               range = range.cloneRange();
               range.setStartAfter(lastNode);
               range.collapse(true);
               sel.removeAllRanges();
               sel.addRange(range);
            }
    /*
           if(range.endOffset != 1 && range.commonAncestorContainer.webkitdropzone==""){
              
     
              
              
              
               //  $(range.commonAncestorContainer).unwrap();
               //  $(range.commonAncestorContainer).parent().html($(range.commonAncestorContainer).parent().text())
                var TempTextContent = range.commonAncestorContainer.textContent;
                range.commonAncestorContainer.textContent = TempTextContent;
               //$(range.commonAncestorContainer).html($(range.commonAncestorContainer).html());
           }
           */
          
         }
      } 
      else{
         if (windo.document.selection && windo.document.selection.type != "Control") {
            // IE < 9
            windo.document.selection.createRange().pasteHTML(html);
         }
      }
      //  $($('iframe').get(0).contentWindow.document.body)
      
   };
   $.fn.NPSelectionStart=function(){
      if (!this.length)
         return;
      return this[0].selectionStart;
   }
   $.fn.NPSelectionEnd=function(){
      if (!this.length)
         return;
      return this[0].selectionEnd;
   }
   $.fn.NPSelectionText=function(){
      if (!this.length)
         return;
      var Start=this[0].selectionStart,
          End=this[0].selectionEnd,
          Value=this[0].value;
      if (typeof(Start)=='undefined'||!End||(Start==End))
         return '';
      return Value.substring(Start,End);
   }
   
   $.fn.insertAtCaret = function (tagName) {
      return this.each(function () {
         /*if (document.selection) {
            //IE support
            this.focus();
            sel = document.selection.createRange();
            sel.text = tagName;
            this.focus();
            sel.moveEnd('textedit', 0);
            sel.select();
         } 
         else */ if (this.selectionStart || this.selectionStart == '0') {
            //MOZILLA/NETSCAPE support
            startPos = this.selectionStart;
            endPos = this.selectionEnd;
            scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos, this.value.length);
            this.focus();
            this.selectionStart = startPos + tagName.length;
            this.selectionEnd = startPos + tagName.length;
            this.scrollTop = scrollTop;
         }
         else {
            this.value += tagName;
            this.focus();
         }
      });
   };
   npLog = function (msg,iserror) {
      try{
         if (console){
            if (iserror)
               console.error(msg);
            else
               console.log(msg);      
         }
      }
      catch(e){
         
      }
      return;
   };
   
})(jQuery);
//$.browser
(function($) {
   var matched, browser;
   // Use of $.browser is frowned upon.
   // More details: http://api.jquery.com/jQuery.browser
   // $.uaMatch maintained for back-compat
   $.uaMatch = function( ua ) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
          /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
          /(msie) ([\w.]+)/.exec( ua ) ||
          ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
          [];
      return {
         browser: match[ 1 ] || "",
         version: match[ 2 ] || "0"
      };
   };
   matched = $.uaMatch( navigator.userAgent );
   browser = {}; 
   if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
   }
   // Chrome is Webkit, but Webkit is also Safari.
   if ( browser.chrome ) {
      browser.webkit = true;
   } 
   else if ( browser.webkit ) {
      browser.safari = true;
   }
   $.browser = browser;
   $.sub = function() {
      function jQuerySub( selector, context ) {
         return new jQuerySub.fn.init( selector, context );
      }
      $.extend( true, jQuerySub, this );
      jQuerySub.superclass = this;
      jQuerySub.fn = jQuerySub.prototype = this();
      jQuerySub.fn.constructor = jQuerySub;
      jQuerySub.sub = this.sub;
      jQuerySub.fn.init = function init( selector, context ) {
         if ( context && context instanceof $ && !(context instanceof jQuerySub) ) {
            context = jQuerySub( context );
         }
         return $.fn.init.call( this, selector, context, rootjQuerySub );
      };
      jQuerySub.fn.init.prototype = jQuerySub.fn;
      var rootjQuerySub = jQuerySub(document);
      return jQuerySub;
   };
})(jQuery);
//npupdown.js
(function($){
   $.widget("np.npupdwn",{
      options:{
         url         :'/frm/npupl/default.aspx',
         upl         :true,
         AppendTo    :null,
         ClkElem     :null,
         InData      :null,
         AfterGO :null,
         BeginGO :null,
         EndGO   :null
      },
      _create:function(){
         var self = this, op = self.options, e = self.element;
         self.init=0 /*0:not postback, 1:post back, 2:in loading, 6:(in case of download) getfile*/;
         var  iframeId = 'unique' + (new Date().getTime());
         self.iframe = $('<iframe src="'+op.url+'" name="'+iframeId+'" style="border:1px solid black;position:absolute;top:-15px;height:10px" />')
                      .appendTo(op.AppendTo)
                      .load(function(){
                           if(self.init==1){
                              self._trigger('EndGO');
                           }
                           self.err=false;
                           try{
                              self.ifc= self.iframe.contents();
                              self.mx = self.ifc.find('input[name="medxml"]');
                              self.br = self.ifc.find('input[type="file"]');
                              if(self.mx.length ===0 ){
                                 self.err=true;
                              }
                           }
                           catch(e){
                              self.err=true;
                           }
                           if(self.err){
                              if(self.init!=1)return;
                              self._ReloadIfr();
                              return;
                           }
                           if (op.upl){
                              self.ifc.find('#fileupl').change(function() {
                                 self._trigger('BeginGO');
                                 self.ifc.find('#uplfrm').submit();
                              });
                           }
                           if(self.init==1){
                              self.data.xml=self.ifc.find('#medxml').val();
                              self._trigger('AfterGO',null,self.data);
                              if(!op.upl){
                                 var s="",x=$.parseXML(self.ifc.find('#medxml').val());
                                 if($("msg>error",x).length==0){
                                    $.each($("outpar",x)[0]
                                          .attributes,function(i,v){
                                             s=s+'&'+v.name+"="+v.value;
                                          });
                                    self.iframe.attr('src',"/frm/npdwn/getfile.aspx?"+s.substr(1));
                                    self.init = 6;
                                 }
                              }
                           }
                      });
         e.click(function(){  
            if ($(this).prop('disabled'))
               return;
            if(self.err) {
               if(self.init!=2){
                  self._ReloadIfr();
               }
               return;
            };
            self.data={};
            self._trigger('InData',null,self.data);
            self.ifc.find('#medxml').val(escape(self.data.xml));
            if(!op.upl){
               self._trigger('BeginGO');
               self.ifc.find('#dwnfrm').submit();
            }
            else{
               self.iframe.show();
               $(self.br).click();
            }
            self.init=1; 
         });

      },
      _ReloadIfr:function(){
         var self = this, op = self.options, e = self.element;
         self.init=2;
         self._ShowIfr(function(){
                         self.iframe
                         .css({
                            width: 10 
                         })
                         .attr('src', op.url);
                         self.init=0;
                });
      },
      _ShowIfr:function(CallBack){
         var self = this, op = self.options, e = self.element;
         self.iframe
         .css({width:600,height:300})
         .position({of:$('body')});
         
         setTimeout(function(){
            self.iframe
            .animate({top:-15,
                      height:10},
                      500,
                      CallBack
             );
            
         },2000);
      }
   });
   
})(jQuery);   
   
// Start Message Widget
(function($) {
   // Message Widget Is Custom Alert And Confirm : Create By Saeed Jafary

   /* User Code
    Alert:
    self.Message({type:'alert',text:'Test',AfterSelect:function(myEvent){
    
    }});

    Confirm:
    self.Message({type:'confirm',text:'Test',AfterSelect:function(myEvent, result){
    if (result.yes) { // User Clicked Yes
    }
    else{  // User Clicked No
    }
    }});

    */

   $.widget("np.npmessage", {
      options : {
         type : 'alert',
         text : '',
         height : 200,
         width : 300,
         title : 'پيغام',
         //callback
         MessageCallback:null
      },

      _create : function() {
         var self = this, op = self.options, e = self.element;
         self.AlertButton={
            "تایید" : function() {
               self.TriggerFired=true;
               $(this).dialog('close');
               self._trigger('MessageCallback', null);
            }
         }
         self.ConfirmButton={
            "بله" : function() {
               self.TriggerFired=true;
               $(this).dialog('close');
               self._trigger('MessageCallback', null, {yes : true, no : false});
            },
            "خیر" : function() {
               self.TriggerFired=true;
               $(this).dialog('close');
               self._trigger('MessageCallback', null, {yes : false,no : true});
            }
         }
         self.DialogContent=$('<div/>');
         e.append(self.DialogContent);   
         self.DialogContent.dialog({
            autoOpen:false,
            closeOnEscape:false,
            resizable : false,
            appendTo:e,
            modal : true,
            close : function(){
               if (!self.TriggerFired){
                  if (self.ConfirmButton==self.DialogContent.dialog('option','buttons')){
                     self._trigger('MessageCallback', null, {yes : false,no : true});
                  }
                  else{
                     self._trigger('MessageCallback', null);
                  }
               }
            }
         });
      },
      Dialog:function(Message,Type) {
         var self = this, op = self.options, e = self.element;
         var buttons;
         op.MessageCallback = Message.AfterSelect||null;
         var type= Message.type || op.type;
         if (type == 'confirm'){
            buttons = self.ConfirmButton;
         }
         else{
            buttons = self.AlertButton; 
         }
         self.DialogContent.html("<p style='text-align:right;font-family:tahoma'>" + Message.text + "</p>");
         self.TriggerFired=false;
         self.DialogContent
         .dialog('option','title',Message.title||op.title)
         .dialog('option','height',Message.height||op.height)
         .dialog('option','width', Message.width||op.width)
         .dialog('option','buttons',buttons)
         .dialog('open');
      }
      // End Message Widget
   });
   
   
$.widget("np.npeditor", {
   options : {
      npform : null,
      //callback
      change : null
   },

   _create : function() {
      var self = this, op = self.options, elem = self.element
          id=elem.attr("id");
      var OriginalWidth = elem.width();
      var OriginalHeight = elem.height();
      if (OriginalWidth < 200)
         OriginalWidth = 450;
      if (OriginalHeight < 45)
         OriginalHeight = 45; 
      self.EditorHeight=0;
      self.ElemId = elem.attr('id')+"_Editor";
      self.Parent = $("<div class='ui-widget ui-widget-content'></div>");
      self.RequireSpan = $("<span style='float:left;display:none'>*</span>").appendTo(self.Parent);
      var FullScr = $("<span class='ui-icon ui-icon-zoomin'/>").appendTo(self.Parent);
      self.Main = $("<div style='padding:0px;margin:0px;height:" + OriginalHeight + "px;overflow-y:scroll;width:" + OriginalWidth + "px' ></div>").appendTo(self.Parent);
      self.Buttons = $("<div style='display:none;margin-top:5px'><button id='bold' title='درشت'  ><span class='ui-icon np-icon np-editor-bold-icon'></span></button><button id='italic' title='کج'><span class='ui-icon np-icon np-editor-italic-icon'></span></button><button id='JustifyLeft' title='چپ چین' ><span class='ui-icon np-icon np-editor-left-icon'></span></button><button id='JustifyCenter' title='وسط چین'><span class='ui-icon np-icon np-editor-center-icon'></span></button><button id='JustifyRight' title='راست چین'><span class='ui-icon np-icon np-editor-right-icon'></span></button><button id='underline' title='زیر خط دار'><span class='ui-icon np-icon np-editor-underline-icon'></span></button><button id='ltr' title='راست به چپ'><span class='ui-icon np-icon np-editor-ltr-icon'></span></button><button id='rtl' title='چپ به راست'><span class='ui-icon np-icon np-editor-rtl-icon'></span></button></div>").appendTo(self.Main)
      self.Lang = $("<div class='ui-state-highlight' style='display:none;float:left;width:auto;margin-left:5px;padding:5px;cursor:pointer'></div>").appendTo(self.Buttons);
      $("<hr />").appendTo(self.Buttons)
      var Editor=self.Editor = $("<div id="+self.ElemId+" contenteditable='true' class='np-editor' dir='rtl'   style='width:auto;height:auto;display:block;outline:none;word-wrap: break-word;margin-right:5px' ></div>").appendTo(self.Main)
      self.HtmlBox = $("<div style='display:none'><textarea cols='50' rows='2' dir='ltr'></textarea><button>ثبت</button></div>").appendTo(self.Parent)
      self.Parent.insertAfter(elem);
      elem.hide();
      self.ie = false;
      if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0) {
         self.ie = true;
      }
      self.Buttons.buttonset()/*.tooltip()*/;
      self._on(self.Main,{
         'click':function() {    
            Editor.focus()  
         }
      });
      self._on(true,FullScr,{
         'click':function() {
            var Obj=this;
            self.Buttons.show();
            FullScr.hide();
            var bod=self.options.npform.Get$bod(),
                h=Array.max([bod.height()-300,parseInt(bod.height()*4/5,10)]),
                w=Array.max([bod.width()-300,parseInt(bod.width()*4/5,10)]);
            self.Main.dialog({
               width : w,
               height : h,
               modal : true,
               closeOnEscape : false,
               closeText : "minimize",
               open: function(event, ui) {
                  Editor.focus()
               },
               close : function(event, ui) {
                  self.Main.dialog('destroy');
                  self.Buttons.hide();
                  FullScr.show()
               },
               focus: function( event, ui ) {
                  self.Parent.css("z-index","999");
               }
            })
   
         }
      });
      self._on(self.HtmlBox,{
         'click button':function(e) {           
           Editor.pasteHtmlAtCaret($('textarea',self.HtmlBox).val(), Editor.contentWindow, Editor);
         }
      });
      self._on(self.Lang,{
         'click':function(e) {
            self.options.npform.Valid_.CurLang = (self.options.npform.Valid_.CurLang == "farsi") ? "latin" : "farsi";          
           self.Lang.show().text((self.options.npform.Valid_.CurLang == "farsi") ? "فارسی" : "انگلیسی");
         }
      });
      self._on(Editor,{
         'blur':function(e) {
            self._trigger('change',e,{Val:Editor.html()});
         },
         'keyup':function(e) {
            self.options.npform._KeyUp(e, $(self.element));
            self.Lang.show().text((self.options.npform.Valid_.CurLang == "farsi") ? "فارسی" : "انگلیسی");
            self.UpdateToolbar();
         },
         'keypress':function(e){
            self.options.npform._KeyPress(e, $(self.element), Editor);
            self.Lang.show().text((self.options.npform.Valid_.CurLang == "farsi") ? "فارسی" : "انگلیسی");
            var p = self.Main,
                y = self.getSelectionCoords();   
            if(y > p.position().top + p.height())
               p.scrollTop(p.scrollTop()+20);
         },
         'paste':function(e){
            var p = self.Main,
                y = self.getSelectionCoords();   
            if(y > p.position().top + p.height())
                p.scrollTop(p.scrollTop()+20);
            var pastedText;
            if(window.clipboardData) {// IE
               pastedText = window.clipboardData.getData('Text');
               pastedText = pastedText.replace(/\n/g, "<br />");
               self.ie = true;
               Editor.pasteHtmlAtCaret(pastedText, Editor.contentWindow, Editor);
         
            } else if (e.originalEvent.clipboardData) {// Other
               pastedText = e.originalEvent.clipboardData.getData('text/plain');
               pastedText = pastedText.replace(/\n/g, "<br />");
               self.ie = false;
               document.execCommand('insertHTML', false, pastedText)
            }
            return false;
         },
         'mouseup':function(){
            self.UpdateToolbar();  
         }
         
      });

      self._on(self.Buttons,{
         'click button':function(ev){
            var target = $( ev.currentTarget )
            if (!self.ie) {
               var useCSS = true;
               document.execCommand("styleWithCSS", true, useCSS.toString());
            }
            switch(target.attr("id")) {
               case "bold": {                    
                  document.execCommand('bold', 0, null);
                  break;
               }
               case "italic": {
                  document.execCommand('italic', 0, null);
                  break;
               }
               case "underline": { 
                  document.execCommand('underline', 0, null);
                  break;
               }
               case "JustifyLeft": {
                  document.execCommand('JustifyLeft', 0, null);
                  break; 
               }
               case "JustifyRight": {
                  document.execCommand('JustifyRight', 0, null);
                  break;
               }
               case "JustifyCenter": {
                  document.execCommand('JustifyCenter', 0, null);
                  break;
               }
               case "ltr":
               case "rtl":
               {
                  document.execCommand("fontName", false,'_');
                  var dir = target.attr("id"),
                      align = (dir == "ltr") ? "left" : "right",
                      count = 0,
                      span = $("[style*='_']",self.Editor),
                      font = $("[face*='_']",self.Editor);
                  if(span.length != 0){
                     //Chrome
                     count = 1;
                     if(span.parent('div').hasClass("np-editor"))
                     {
                        //First Line
                        span.wrap('<div></div>');
                        span.css("font-family","tahoma").parent('div').css('text-align',align).attr("dir",dir);     
                     }
                     else{
                        span.parent('div').css('text-align',align).attr("dir",dir);
                     }
                  }
                  else if(font.length != 0){  
                     //Ie & FireFox 
                     count = 1;
                     if(font.closest('p').length != "0"){
                        font.closest('p').attr('align',align).attr("dir",dir);
                     }
                     else{
                        //First Line
                        font.wrap('<p></p>');
                        font.attr('face','tahoma').closest('p').attr('align',align).attr("dir",dir);
                     }
                           
                  }
                  document.execCommand("fontName", false,'tahoma');
                  self.Editor.attr("dir","rtl");
                  if(count)
                     target.addClass("ui-state-highlight");
                  break;
               }
            }
            self.UpdateToolbar();
         }
      })
   },
   getSelectionCoords: function(win) {
      var self = this;  
      win = win || window;
      var doc = win.document;
      var sel = doc.selection, range, rects, rect;
      var x = 0, y = 0;
      if (sel) { // ie9
         range = document.createRange();
         if(document.getElementById(self.ElemId).getClientRects()[0])
            y = document.getElementById(self.ElemId).getClientRects()[0].bottom;
      } 
      else if (win.getSelection) { 
         sel = win.getSelection();
         if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
               range.collapse(true);
               rects = range.getClientRects();
               if (rects.length > 0) {
                  rect = range.getClientRects()[0];
               }
               if(rect)
                  y = rect.top;
            }
         }
      }
      return y;
   },
   UpdateToolbar : function(){
      var self = this, op = self.options, elem = self.element
         var Toolbar=['bold','italic','JustifyLeft','JustifyRight','JustifyCenter','underline'];
         $(Toolbar).each(function(i,v){
            if(document.queryCommandState(v))
               $('#'+v,self.Buttons).addClass("ui-state-highlight")
            else
               $('#'+v,self.Buttons).removeClass("ui-state-highlight")
         });
      setTimeout(function() {
         $('#ltr',self.Buttons).removeClass("ui-state-highlight");
         $('#rtl',self.Buttons).removeClass("ui-state-highlight");
      },1000) 
   },
   Require : function(arg){
      var self = this, op = self.options, elem = self.element
      if(arg)
         self.RequireSpan.show();
      else
         self.RequireSpan.hide();
   },
   _setOption: function( key, value ) {
      var self=this;
      if ( key === "disabled" ) {
         var ed=this.Editor;
         ed.prop('contentEditable',!value)
         //!value?ed.removeClass('ui-state-disabled'):ed.addClass('ui-state-disabled');
         if (value){
            self.Main.css('cursor','not-allowed')
            self.Parent.css('border-style','dotted')
            $("button",self.Buttons).removeClass("ui-state-highlight").button("disable"); 
         }
         else{
            self.Main.css('cursor','text');
            self.Parent.css('border-style','solid')
            $("button",self.Buttons).button("enable"); 
         }
      }
      this._super( key, value);

   },
   Val:function(val,Html){
      /*
      if (typeof(val)!=='undefined'){
         if(Html){
            this.Editor.html(val);
         } 
         else{
            var value = $(val).text()
            this.Editor.text(value);
         }
               
      }
      return this.Editor.html(); 
      */
   },
   _destroy : function() {
      var self = this, op = self.options, e = self.element;
   }
}); 

})(jQuery);
   
   

