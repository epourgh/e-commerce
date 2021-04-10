## USPS Tracking

```python
from usps import USPSApi
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
uspsUsername = os.getenv('USPS_API_USERNAME')
usps = USPSApi(uspsUsername)
testTrackingNumber = os.getenv('USPS_TRACKING_TEST')
track = usps.track(testTrackingNumber)
print(track.result['TrackResponse']['TrackInfo']['TrackSummary'])

# {
#   'EventTime': '10:22 am', 
#   'EventDate': 'April 6, 2021', 
#   'Event': 'Arrived at USPS Regional Origin Facility', 
#   'EventCity': 'COPPELL TX DISTRIBUTION CENTER', 
#   'EventState': None, 
#   'EventZIPCode': None, 
#   'EventCountry': None, 
#   'FirmName': None, 
#   'Name': None, 
#   'AuthorizedAgent': 'false'
# }
```