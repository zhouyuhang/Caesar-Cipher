var app = angular.module('myApp', []);

app.controller('Configuration', function($scope) {
    $scope.keywords = "";

    $scope.showencode = false;

    $scope.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    
    var count=0;

    $scope.offset = 0;

    $scope.update = function(){
    	$scope.showencode = true;    	
    	var list = $scope.keywords.toUpperCase().split("");
    	//console.log(list);
    	var tbody = document.getElementById("keytable");
    	tbody.innerHTML = "";
    	var tr = "<tr>";
    	for(i=0;i<list.length;i++){    		
    		tr += "<td>" + list[i] + "</td>";    		
    	}
    	tr += "</tr>";

    	tr += "<tr>";
    	for(i=0;i<list.length;i++){    		
    		tr += "<td>" + (list[i].charCodeAt(0)-65) + "</td>";    		
    	}
    	tr += "</tr>";
    	tbody.innerHTML += tr;

        $scope.offset = document.getElementById("keytable").rows[1].cells[0].innerHTML;
        console.log($scope.offset);
    	//set highlight cells
    	document.getElementById("keytable").rows[0].cells[0].classList.add('bg-primary');
    	document.getElementById("keytable").rows[1].cells[0].classList.add('bg-primary');
    	//clear source and cipher
    	count = 0;
    	document.getElementById("sourcetext").value = "";
    	document.getElementById("ciphertext").value = "";
    };

    $scope.encode = function(x){
    	document.getElementById("sourcetext").value += x;    	
    	var keyword_length = $scope.keywords.length; //count the length of keyword
    	//console.log(keyword_length);
    	var order = count % keyword_length;
    	count = count + 1;
       	//console.log(order);
    	var currentOffset = document.getElementById("keytable").rows[1].cells[order].innerHTML;
    	var offsetCharacter = $scope.characterTransform(x,currentOffset);
    	document.getElementById("ciphertext").value += offsetCharacter;
        //highlight the responding key table cells in this order
        document.getElementById("keytable").rows[0].cells[order].classList.remove('bg-primary');
        document.getElementById("keytable").rows[1].cells[order].classList.remove('bg-primary');

        if(order!=keyword_length-1){
        document.getElementById("keytable").rows[0].cells[order+1].classList.add('bg-primary');
        document.getElementById("keytable").rows[1].cells[order+1].classList.add('bg-primary');
        $scope.offset = document.getElementById("keytable").rows[1].cells[order+1].innerHTML;
        }else{
        document.getElementById("keytable").rows[0].cells[0].classList.add('bg-primary');
        document.getElementById("keytable").rows[1].cells[0].classList.add('bg-primary');
        $scope.offset = document.getElementById("keytable").rows[1].cells[0].innerHTML;
        }	
    }; 

    $scope.characterTransform = function(x,offset){
        var offsetValue = parseInt($scope.offset);
        var number = x.charCodeAt(0)+offsetValue; //number represent the Charcode of encoded character
        if(number>90){
            number= 64+number-90; // Make the ASKII charcode with in the range of 65-90
        }
        var offsetCharacter = String.fromCharCode(number);
        return offsetCharacter;
    };

    $scope.clear = function(){
        $scope.update();
    };
});
