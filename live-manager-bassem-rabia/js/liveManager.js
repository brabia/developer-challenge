/** 
	@ ------------------------------------------------------
	@	Live Manager 1.0
	@ ------------------------------------------------------ 
	
	@ 	Project Name: Live Manager 
	@ 	Description: Istanbul Turkey
	@ 	Project URI: --
	@ 	Version: 1.0 
	@ 	Author: Live Manager 
**/  
$(document).ready(function(){
	/** 
		@ ------------------------------------------------------
		@	Welcome To Live Manager JS File
		@ ------------------------------------------------------ 
	**/ 
	var chart1; 
	var chart2; 
	var chart3; 
	LiveManagerGeneratorAuto();      
});  

function LiveManagerGeneratorAuto(){ 
	$('#ChartDiv1').html('');
	$('#ChartDiv2').html('');
	$('#ChartDiv3').html('');
	LiveManagerGenerator();  
	setTimeout(LiveManagerGeneratorAuto, 5000); // 1000 = 1sec 	
}

function LiveManagerbeautifier(action){  
	var beautifullActionName = action;
	switch(action){
		case 'successful_pass': beautifullActionName = 'Successful Pass'; break;
		case 'successful_duel': beautifullActionName = 'Successful Duels'; break; 
		case 'shot_on_target': beautifullActionName = 'Shot on Target'; break; 
		case 'goal_scored_team': beautifullActionName = 'Goal scored team'; break; 
		case 'aerial_duel_won': beautifullActionName = 'Aerial duel Won'; break; 
		case 'dribble_won': beautifullActionName = 'Dribble Won'; break; 
		case 'goal_against_team': beautifullActionName = 'Goal against team'; break; 
		case 'long_pass': beautifullActionName = 'Long pass'; break; 
		case 'defensive_clearance': beautifullActionName = 'Defensive clearance'; break; 
		case 'match_lost': beautifullActionName = 'Match lost'; break; 
		case 'cross_completed': beautifullActionName = 'Cross completed'; break; 
		case 'interception': beautifullActionName = 'Interception'; break; 
		case 'offside': beautifullActionName = 'OffSide'; break; 
		case 'goal': beautifullActionName = 'Goal'; break; 
		case 'assist': beautifullActionName = 'Assist'; break; 
		case 'big_chance_created': beautifullActionName = 'Big chance created'; break; 
		case 'blocked_shot': beautifullActionName = 'Blocked shot'; break; 
		case 'attempt_saved': beautifullActionName = 'Attempt saved'; break; 
		case 'clean_sheet': beautifullActionName = 'Clean sheet'; break; 
		case 'starting_11': beautifullActionName = 'Starting 11'; break; 
		case 'match_won': beautifullActionName = 'Match won'; break; 
	}
	return(beautifullActionName);
}
function LiveManagerCalculator(action, return_action){   
	/* return_action 0, 1 */
	$.ajaxSetup({ cache: false });
	$.getJSON('data/actions.json', function(data){ 
		var LiveManagerOcc = 0;
		$.each(data, function(index, LM){    
			if(LM.action_name===action){   
				LiveManagerOcc = LiveManagerOcc+1; 
			}  
		}); 
		if(return_action==0){
			$('#LiveManagerActions .LiveManagerMenuActions .'+action).html(''+LiveManagerOcc);  
		} 
		if(return_action==1){  
			return(LiveManagerOcc);
		} 
	});   
} 
function LiveManagerSetItem(Item){   
	return((Math.random()));
}
function LiveManagerGenerator(){  
	$.ajaxSetup({ cache: false });
	$.getJSON('data/actions.json', function(data){  
		var LiveManagerAction				= [];   
		var LiveManagerActionHTML			= [];  
		/* loop through array */ 
		$.each(data, function(index, LM){  
			var LiveManagerPush = false;
			if($.inArray(LM.action_name, LiveManagerAction)<0){  
				LiveManagerAction.push(LM.action_name);  
				LiveManagerPush = true; 
			} 
			if(LiveManagerPush){  
				LiveManagerCalculator(LM.action_name, 0);
				LiveManagerActionHTML.push('<li class="LiveManagerMenuItem">'+LiveManagerbeautifier(LM.action_name)+' <span id="'+LM.action_name+'" class="LiveManagerMenuItemOccu '+LM.action_name+'">0</span></li>'); 
				$('#LiveManagerActions .LiveManagerMenuData').html('<li class="LiveManagerMenuItem">'+LM.player_name+' <span class="LiveManagerMenuItemOccu">'+LM.total_points+'</span></li><li class="LiveManagerMenuItem">'+LM.league.name+'</li><li class="LiveManagerMenuItem">'+LM.league.season+'</li>'); 
				
			} 
		});   
		/** LiveManager Graph 1 **/
			chart1 = new cfx.Chart();
			chart1.getAnimations().getLoad().setEnabled(true);	
			chart1.getAxisX().getTitle().setText("Live Manager"); 
			var data = chart1.getData();
			data.setSeries(1);
			data.setPoints(12);
			chart1.getLegendBox().setVisible(false); 
			for(var i=0;i<LiveManagerActionHTML.length;i++){  
				data.setItem(0, i, 100.0 * LiveManagerSetItem(LiveManagerAction[i]));
			}
			for(var i=0;i<LiveManagerActionHTML.length;i++){
				chart1.getAxisX().getLabels().setItem(i, LiveManagerbeautifier(LiveManagerAction[i]));
			} 
			var chartDiv = document.getElementById('ChartDiv1');
			chart1.create(chartDiv); 
		/** LiveManager Graph 2 **/
			chart2 = new cfx.Chart();
			chart2.getAnimations().getLoad().setEnabled(true);	
			chart2.setGallery(cfx.Gallery.Bubble);
			var data = chart2.getData();
			data.setItem(0, 0, 70.55);
			data.setItem(1, 0, 77.47);
			data.setItem(0, 1, 53.34);
			data.setItem(1, 1, (45));
			data.setItem(0, 2, 57.95);
			data.setItem(1, 2, 55.07);
			data.setItem(0, 3, 28.96);
			data.setItem(1, 3, 81.45);
			data.setItem(0, 4, 30.19);
			data.setItem(1, 4, 60.9);
			chart2.getAllSeries().setMultipleColors(true);
			chart2.getLegendBox().setVisible(false);
			var chartDiv2 = document.getElementById('ChartDiv2');
			chart2.create(chartDiv2); 
		/** LiveManager Graph 3 **/
			chart3 = new cfx.Chart();
			chart3.getAnimations().getLoad().setEnabled(true);	
			chart3.setGallery(cfx.Gallery.Bubble);
			var data = chart3.getData();
			var data = [];
			for(var i=0;i<LiveManagerActionHTML.length;i++){ 
				data.push(100*LiveManagerSetItem(LiveManagerAction[i]));  
			}  
			chart3.setDataSource(data);
			chart3.getLegendBox().setVisible(false);
			var equalizer = new cfx.equalizer.EqualizerBar();
			var eqItem;
			eqItem = new cfx.equalizer.EqualizerItem();
			eqItem.setCount(2);
			equalizer.getTopItems().add(eqItem);
			eqItem = new cfx.equalizer.EqualizerItem();
			eqItem.setCount(1);
			equalizer.getTopItems().add(eqItem);
			chart3.setGalleryAttributes(equalizer); 
			var chartDiv3 = document.getElementById('ChartDiv3');
			chart3.create(chartDiv3); 
		$('#LiveManagerActions .LiveManagerMenuActions').html(LiveManagerActionHTML); 
	});    
	
	
	// setTimeout(LiveManagerGenerator, 1000); // 1000 = 1sec 
} 