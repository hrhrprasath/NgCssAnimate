angular.module("ngcssanimate",[])
.directive('ani',function(){
return {
	restrict: 'A',
	link: function (scope, element, attrs) {
		var classCss = attrs['aniClass'] || '';
		var event = attrs['aniEvent'] || '';
		var eventOnce = attrs['aniEventOnce'] || '';
		var scopeclass = attrs['aniScopeClassVar'] || '';
		var addtionalClass = attrs['aniAdditionalClass'] || '';
		var triggerElementEvt = attrs['aniTriggerElementEvent'] || '';
		var triggerElementId = attrs['aniTriggerElementId'] || '';
		var triggerElementOnce = attrs['aniTriggerOnce'] || '';
		var onDomScroll = attrs['aniOnDomScroll'] || '';
		var triggerElement,animationCalss,anngularDoc;
		if(triggerElementId)
			triggerElement = angular.element(document.getElementById(triggerElementId));
		if(scopeclass){
			animationCalss ='animated '+scope[scopeclass]+' '+addtionalClass;
			scope.$watch(scopeclass,function(newval,oldval){
				if(newval){
					element.removeClass(animationCalss);
					animationCalss ='animated '+newval;
					if(triggerElement && triggerElementEvt)
						addEvent(triggerElement,triggerElementEvt,treggerElementCB);
					else if(!event)
							element.addClass(animationCalss);
					if(event)
						addEvent(element,event,elementCB);
				}
			});
		}
		else{
			animationCalss ='animated '+classCss+' '+addtionalClass;
		}
		var addEvent = function(ele,evnt,callback){
			ele.bind(evnt,callback);
		};
		var removeEvent = function(ele,evnt,callback){
			ele.unbind(evnt,callback);
		};
		var elementCB =function(){
			element.addClass(animationCalss);
			if(eventOnce)
				removeEvent(element,event,elementCB)
		};
		var treggerElementCB = function(){
			element.addClass(animationCalss);
			if(triggerElementOnce)
				removeEvent(triggerElement,triggerElementEvt,treggerElementCB);
		};
		var domScrollCB = function(){
		 	var doc = document.documentElement;
			var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			if(element[0].offsetTop < top+window.innerHeight && element[0].offsetTop > window.innerHeight ){
			 element.addClass(animationCalss);
			 removeEvent(anngularDoc,"scroll",domScrollCB);
			}
		};
		if(event){
			addEvent(element,event,elementCB);
		}
		else if(!triggerElement && !triggerElementEvt){
			if(onDomScroll && element[0].offsetTop < window.innerHeight)
				element.addClass(animationCalss);
			else
				element.addClass(animationCalss);
		}
		if(triggerElement && triggerElementEvt)
		{
			addEvent(triggerElement,triggerElementEvt,treggerElementCB);
		}
		if(onDomScroll)
		{
			 anngularDoc = angular.element(document);
			 if(element[0].offsetTop > window.innerHeight)
				addEvent(anngularDoc,"scroll",domScrollCB);
		}
		element.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			element.removeClass(animationCalss);
		});
	}
}
});