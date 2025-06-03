sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'anubhav/po/managepo/test/integration/FirstJourney',
		'anubhav/po/managepo/test/integration/pages/POsList',
		'anubhav/po/managepo/test/integration/pages/POsObjectPage',
		'anubhav/po/managepo/test/integration/pages/POItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, POItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('anubhav/po/managepo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePOItemsObjectPage: POItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);