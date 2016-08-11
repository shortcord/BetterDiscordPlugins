//META{"name":"BackgroundRotation"}*//

var BackgroundRotation = function () {};
BackgroundRotation.prototype.getName = function () { return "Background Rotation"; };
BackgroundRotation.prototype.getDescription = function () { return "Auto Switch backgrounds"; };
BackgroundRotation.prototype.getVersion = function () { return "0.1"; };
BackgroundRotation.prototype.getAuthor = function () { return "Short Cord (shortcord.com)"; };

BackgroundRotation.prototype.switchBG = function() {
	BdApi.clearCSS("SC-bgRot");
	BdApi.injectCSS("SC-bgRot", ".app, .callout-backdrop { background: url(" + this.GetImage(this.GetImageStorage()) + ") no-repeat center center fixed !important; background-size: cover !important; }");
};

BackgroundRotation.prototype.GetImageStorage = function() {
	var local = localStorage["SCBackGrounds"];
	if (local == undefined) { //storage isn't there
		var images = ["https://i.imgur.com/4BF2goF.jpg", "https://i.imgur.com/n4ZDtnz.jpg", "https://i.imgur.com/Hi3RjrP.png"]; //some default images
		local = JSON.stringify(images);
		localStorage["SCBackGrounds"] = local;
	}
	return JSON.parse(local);
};

BackgroundRotation.prototype.SetImageStorage = function(value) {
	localStorage["SCBackGrounds"] = JSON.stringify(value);
};

BackgroundRotation.prototype.GetTimerSetting = function() {
	var local = localStorage["SCTimer"];
	if (local == undefined) {
		local = 5000;
		localStorage["SCTimer"] = local;
	}
	return local;
};

BackgroundRotation.prototype.SetTimerSetting = function(value) {
	localStorage["SCTimer"] = value;
};

BackgroundRotation.prototype.GetImage = function(storage) {
	window.SCImageIndex++;
	var imageArray = storage;
	if (window.SCImageIndex > imageArray.length - 1) { window.SCImageIndex = 0;}
	console.log(window.SCImageIndex + " " + imageArray[window.SCImageIndex])
	return imageArray[window.SCImageIndex];
};

BackgroundRotation.prototype.start = function () {
	BdApi.injectCSS("SC-bgRot-init", ".app, .callout-backdrop { transition: background 2s; }");

	window.SCImageIndex = Math.floor((Math.random() * JSON.parse(BackgroundRotation.prototype.GetImageStorage()).length) + 1);
	window.SCIntervalId = window.setInterval(function() {BackgroundRotation.prototype.switchBG();}, BackgroundRotation.prototype.GetTimerSetting());
};

BackgroundRotation.prototype.load = function () {};
BackgroundRotation.prototype.unload = function () {};
BackgroundRotation.prototype.stop = function () {};
BackgroundRotation.prototype.getSettingsPanel = function () {
    var storage = this.GetImageStorage();
	
	var html = "";
	html += "<h2>Images</h2>";
	html += "<textarea id='scImageSettingsTa' style='width:100%; min-height:200px;'>";
	JSON.parse(storage).forEach(function(i) {
		html += i + "\n";		
	});
	html += "</textarea>";
	html += "<select id='scImageTimeSettingTa'>";
	html += "<option value='5000'>Default</option>";
	html += "<option value='1000'>1</option>";
	html += "<option value='2000'>2</option>";
	html += "<option value='3000'>3</option>";
	html += "<option value='4000'>4</option>";
	html += "<option value='5000'>5</option>";
	html += "<option value='10000'>10</option>";
	html += "<option value='15000'>15</option>";
	html += "<option value='20000'>20</option>";
	html += "</select> Second(s)<hr/>";
	html += "<button onclick='BackgroundRotation.prototype.saveSettings()'>Save</button>";
	return html;
};

BackgroundRotation.prototype.saveSettings = function() {
	window.clearInterval(window.SCIntervalId); //we stop the loop
	
	var storage = localStorage["SCBackGrounds"];
	var timerStorage = localStorage["SCTimer"];
	var tmp = [];
	
	$("#scImageSettingsTa").val().split("\n").forEach(function(i) {
		if (i.length > 0) {
			tmp.push(i);
		}
	});
	
	localStorage["SCBackGrounds"] = JSON.stringify(tmp);
	
	localStorage["SCTimer"] = $("#scImageTimeSettingTa").val();
	
	window.SCImageIndex = Math.floor((Math.random() * JSON.parse(BackgroundRotation.prototype.GetImageStorage()).length) + 1);
	window.SCIntervalId = window.setInterval(function() {BackgroundRotation.prototype.switchBG();}, BackgroundRotation.prototype.GetTimerSetting());
};