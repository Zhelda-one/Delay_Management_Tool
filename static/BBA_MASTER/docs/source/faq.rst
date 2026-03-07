FAQ
========

L2L1 version I want to use is missing
-----------------------
Please write an email to us and attach the capture. 

Problems with L2L1 autodetection. 
-----------------------
"L2L1 version autodetect" option works in following way:

1. BBA collects all l2l1.message IDs in capture.
2. Next BBA finds all the L2L1 versions that decodes maximum number of messages. 
3. From all found L2L1 versions BBA selects the newest one and it prints information about found versions in LOG dialog window. 

There is one problem with this algorithm - message definitions change between L2L1 versions. BBA only detects if particular L2L1 version has certain ID version in its definition - it does not check if it can decode all packets. Sometimes you have to manualy select proper L2L1 version to sucessfully decode all packets.

"L2L1 version detailed autodetect" algorithm:

1. BBA performs first two steps from "L2L1 version autodetect" algorithm.
2. BBA tries to decode all messages with all found L2L1 versions (this step takes a long time to finish).
3. BBA counts the number of errors for each L2L1 version.
4. BBA selects the L2L1 version with the smallest number of errors.


Calculation of rms, rms_dbFS, rms_dBm
-----------------------

RMS stands for root mean square. BBA first takes the sum of the squares of amplitudes of IQ samples in the packet and then it divides it by number of samples and finaly it takes a root square of the value. 

.. math::
    RMS = \sqrt{\frac{I_1^2 + Q_1^2 + I_2^2 + Q_2^2 + I_3^2 + Q_3^2 + ... + I_N^2 + Q_N^2}{N}}


RMS dbFS (decibels relative to full scale). When compression method is selected as "No compression" or "Block floating point" BBA will calculate this parameter in following way:

.. math::
   RMS_{dbFS} = 20*log_{10}(RMS) + interfaceResolution


RMS_dBm is equal to:

.. math::
   RMS_{dBm} = 20*log_{10}(RMS) - 152 - ecpri_{ulGain} + 10 + log_{10}(12)

Interface resolution and ecpri ulGain is defined in ORAN. 


How does eCPRI compression autodetection works
-----------------------

BBA iterates over all possible IQ bit width and IQ compression method combinations and for each of them it calculates bit size of the payload. 
Then it compares it to the actual length of the payload. 
If the two values are not equal it discards this particular configuration. 
Algorithm is sucessfull if only one possible configuration is left at the end - otherwise it prints apropriate message in the LOG dialog window. 

