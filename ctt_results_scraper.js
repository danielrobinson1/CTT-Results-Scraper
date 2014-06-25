var request = require('request');
var cheerio = require('cheerio');

var cttRaceId = 59445;
var url = 'http://ww2.cyclingtimetrials.co.uk/Default.aspx?&ge1661__geka=1QkudlbsyaznI8nIEdhtNfxJ2GnxYXE00QFR9KF2O8dcBz7UXqvNXDinoHvSfRBRhdlr1Vg5J0SZzPr91RqOZf5WUd8ek4586uBBdXUu5BE&ge1661__gevi=bkosVTEcmXX5ekdECVvBmA&gv484__gvff0=' + cttRaceId + '&gv484__gvfl0=0&gv676__gvac=2&language=en-GB&tabid=723';
var resultsOdd = [];
var resultsEven = [];
var results = [];
var eventDetails;
var noOfRiders = 0;

request(url, function(err, resp, body) {
	errorCheck(err);
	$ = cheerio.load(body);
	
	//Store event details
	$('td.gv_cc', '#dnn_ctr1672_ViewIndooGrid_gv1672').each(function() {
				
		eventDetails = $(this).text().trim();
			
	});
		
	//Store data in odd rows
	$('td.gv_cc', '#dnn_ctr1673_ViewIndooGrid_gv1673').each(function() {
				
		var content = $(this).text().replace(/\r\n\t\t\t\t/g, '');
		content = content.replace(/\r\n\t\t\t/g, '');
		resultsOdd.push(content);
		
	});
		
	//Store data in even rows
	$('td.gv_cc2', '#dnn_ctr1673_ViewIndooGrid_gv1673').each(function() {
				
		var content = $(this).text().replace(/\r\n\t\t\t\t/g, '');
		content = content.replace(/\r\n\t\t\t/g, '');
		resultsEven.push(content);
		
	});
	
	calculateNoOfRiders();
	combineRows();

	displayEventDetails();
	displayResults();
	
});

function errorCheck(x) {
	if (x)
		throw x;
};

function calculateNoOfRiders() {
	noOfRiders = ((resultsOdd.length/8 + resultsEven.length/8)+1)/2;
}

function combineRows() {
	
	(function () {
		
		var i=0;
		while(i < noOfRiders) {
			
			//Appends pos, rider, club, time of odd number positioned riders to results array
			(function(){
				var j=0;
				while(j < 4){
					results.push(resultsOdd[8*i + j]);
					j++;
				}
			})();
			
			//Appends pos, rider, club, time of even number positioned riders to results array
			(function(){
				var k=0;
				while(k < 4){
					results.push(resultsEven[8*i + k]);
					k++;
				}
			})();
		
		i++;
		}
	
	})();

};

function displayEventDetails() {
	console.log("");
	console.log("Event:");
	console.log("");
	console.log(eventDetails);
};

function displayResults() {
	console.log("");
	console.log("Results:");
	console.log("");
	console.log(results);
};