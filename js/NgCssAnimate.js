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
		var delay = parseInt( attrs['aniDelayStart'] || '0');
		var triggerElement,animationCalss,anngularDoc;
		var triggerAnimation = function()
		{
			if(!delay)
				element.addClass(animationCalss);
			else
			{
				var delayedTrigger= function()
				{
					element.addClass(animationCalss);
				}
				setTimeout(delayedTrigger,delay);
				//delay=0;
			}
		};
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
							triggerAnimation();
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
			triggerAnimation();
			if(eventOnce)
				removeEvent(element,event,elementCB)
		};
		var treggerElementCB = function(){
			triggerAnimation();
			if(triggerElementOnce)
				removeEvent(triggerElement,triggerElementEvt,treggerElementCB);
		};
		var domScrollCB = function(){
		 	var doc = document.documentElement;
			var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			if(element[0].offsetTop < top+window.innerHeight && element[0].offsetTop > window.innerHeight ){
			 triggerAnimation();
			 removeEvent(anngularDoc,"scroll",domScrollCB);
			}
		};
		if(event){
			addEvent(element,event,elementCB);
		}
		else if(!triggerElement && !triggerElementEvt){
			if(onDomScroll && element[0].offsetTop < window.innerHeight)
				triggerAnimation();
			else
				triggerAnimation();
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