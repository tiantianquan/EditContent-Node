// var scripts = document.getElementsByTagName("script")
// var currentScriptPath = scripts[scripts.length-1].src;

var app = angular.module('contentEdit', []);

app.directive('editor', ['$document','$window', function($document,$window) { return {
  restrict: 'AE',
  require: '?ngModel',
  // templateUrl: currentScriptPath.replace('content-edit.js', 'content-edit.html'),
  templateUrl: 'components/content-edit/content-edit.html',
  scope:{
    editContent:'=content',
    editAble:'=editable'
  },
  transclude:true,
  link: function(scope, element, attrs,ngModel) {
    scope.pen = {
      actions:{
        h2:function(){
          $document[0].execCommand('formatblock',false,'h2');
        },
        h3:function(){
          $document[0].execCommand('formatblock',false,'h3');
        },
        p:function(){
          $document[0].execCommand('formatblock',false,'p');
        }
      }
    }    

    scope.style = {
      'position': 'absolute',
      'left':0,
      'top':0,
      'visibility':'hidden',
      'background-color':'#000',
      'color':'#fff',
      'cursor':'pointer',
      'border-radius': 7,
      'padding':'5px 10px'
    }

    scope.innerStyle = {
      'padding':'5px 10px'
    }

    scope.activeStyle = {
      'padding':'5px 10px',
      'color':'green'
    }

    element.on('mousedown',function (event){
      $document.on('mouseup',function(e){
        scope.$apply(function(){
          var sel = $window.getSelection();
          if (sel.type === 'Range'){
            var rangeBox = sel.getRangeAt(0).getBoundingClientRect();
            // scope.style.left = rangeBox.left+ rangeBox.width/2;
            scope.style.left = e.pageX - $('.pen-menu').width()/2;
            scope.style.top = rangeBox.top - 30;
            scope.style.visibility = 'visible';
          }
          $document.off('mouseup');
        })
      })
    });

    $document.on('mousedown',function(){
      scope.$apply(function(){
        scope.style.visibility = 'hidden';
      })
    })
  }
}}]);




app.directive('isedit',['$timeout',function($timeout){return{
  restrict:'AE',
  require: '?ngModel',
  link:function(scope,element,attrs,ngModel){
          // don't do anything unless this is actually bound to a model
      if (!ngModel) {
        return
      }
/*
      // options
      var opts = {}
      angular.forEach([
        'stripBr',
        'noLineBreaks',
        'selectNonEditable',
        'moveCaretToEndOnChange',
      ], function(opt) {
        var o = attrs[opt]
        opts[opt] = o && o !== 'false'
      })
*/

      // view -> model
      element.bind('input', function(e) {
        scope.$apply(function() {
          var html, html2, rerender
          html = element.html()
          rerender = false

/*          
          if (opts.stripBr) {
            html = html.replace(/<br>$/, '')
          }
          if (opts.noLineBreaks) {
            html2 = html.replace(/<div>/g, '').replace(/<br>/g, '').replace(/<\/div>/g, '')
            if (html2 !== html) {
              rerender = true
              html = html2
            }
          }
*/
          ngModel.$setViewValue(html)
          if (rerender) {
            ngModel.$render()
          }
          if (html === '') {
            // the cursor disappears if the contents is empty
            // so we need to refocus
            $timeout(function(){
              element[0].blur()
              element[0].focus()
            })
          }
        })
      })

      // model -> view
      var oldRender = ngModel.$render
      ngModel.$render = function() {
        var el, el2, range, sel
        if (!!oldRender) {
          oldRender()
        }
        element.html(ngModel.$viewValue || '')
/* 
        if (opts.moveCaretToEndOnChange) {
          el = element[0]
          range = document.createRange()
          sel = window.getSelection()
          if (el.childNodes.length > 0) {
            el2 = el.childNodes[el.childNodes.length - 1]
            range.setStartAfter(el2)
          } else {
            range.setStartAfter(el)
          }
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
        }
*/

      }
/*
      if (opts.selectNonEditable) {
        element.bind('click', function(e) {
          var range, sel, target
          target = e.toElement
          if (target !== this && angular.element(target).attr('contenteditable') === 'false') {
            range = document.createRange()
            sel = window.getSelection()
            range.setStartBefore(target)
            range.setEndAfter(target)
            sel.removeAllRanges()
            sel.addRange(range)
          }
        })
      }
*/
  }
}}]);


