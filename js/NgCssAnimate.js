angular.module("nganimator",[])
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
	 var triggerElement,animationCalss;
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
	 }
	 var removeEvent = function(ele,evnt,callback){
		ele.unbind(evnt,callback);
	 }
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
		 
	 if(event)
		addEvent(element,event,elementCB);
	else if(!triggerElement && !triggerElementEvt ){
		element.addClass(animationCalss);
	}
	if(triggerElement && triggerElementEvt)
	{
		addEvent(triggerElement,triggerElementEvt,treggerElementCB);
	}
	element.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		element.removeClass(animationCalss);
	 });
	}
}
});