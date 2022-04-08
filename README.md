# IsItBusy

This is an app that uses a python scraper and Google Places API to check the recent audience data. Simple type in a location, select from the autocomplete dropdown, and the project will tell you if it's busy or not.

The intent was a COVID/lockdown assist tool to help people avoid crowds. 

To build yourself, be sure to clone the heroku-python-buildpack and build the binaries yourself. Host them on AWS and edit the buildpack config vars to point to the correct binaries. It opens up the shared libs for use by the python to ruby interpreter.
