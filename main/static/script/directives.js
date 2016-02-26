angular.module('JobsSearch')
  .directive('filePreview', filePreview);

function filePreview() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('change', function() {
        var reader = new FileReader();
        reader.onload = function(event) {
          scope.vm.previewSource = event.target.result
          scope.$apply();
        }

        reader.readAsDataURL(element[0].files[0]);
      });
    }
  }
}
