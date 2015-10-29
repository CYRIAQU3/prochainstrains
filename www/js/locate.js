$(function()
{
	$(".locate-button").click(function()
	{
		startLoading();
		getLocation();
	});
});

function getLocation()
{
	navigator.geolocation.getCurrentPosition(locateSuccess, locateError);
}

function locateSuccess(position)
{
	setPosition(position);
}

function locateError()
{
	stopLoading();
	setLabel("Impossible de vous localiser précisément");
}

function setPosition(position) 
{
	$.get("http://ressources.data.sncf.com/api/records/1.0/search?apikey=829e6d4ebbf031f9bb9e6e9ccad86875a9574ee0f46bb3efa91dcb00&dataset=sncf-gares-et-arrets-transilien-ile-de-france&rows=1&geofilter.distance="+position.coords.latitude+"%2C"+position.coords.longitude+"%2C5000")
	.error(function(){setLabel("Le serveur SNCF ne répond pas...");})
	.done(function(data)
	{
		console.log(data.records[0].fields.code_uic);
		var station_name = data.records[0].fields.libelle_point_d_arret;
		var station_code = data.records[0].fields.code_uic;

		localStorage.setItem("station_name", station_name);
		localStorage.setItem("station_code", station_code);

		setLabel("Gare la plus proche de vous : <b>"+station_name+"</b>");

		getData();
	});
}