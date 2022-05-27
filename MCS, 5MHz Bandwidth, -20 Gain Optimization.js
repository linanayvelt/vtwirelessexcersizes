    function reset() {
        userData.lastBits = rate1 * dt;
    }

    if(init){
        userData.lastdBits = 0;
        userData.tSinceBeginning = 0.0;
        userData.tLastTimeBelowThreshold = 0.0;
        reset();
    }

    userData.tSinceBeginning += dt; // in seconds
 
    const minBits = 1000; // Reduce mcs if fewer bits are received during measureT seconds
    const measureT = 0.01; // Interval in seconds for measuring bits transmitted and received
    let tTryAgain = 0.01; // Time before trying to increase mcs
 
    var dBits = rate1 * dt - userData.lastBits; // Total bits over 5 seconds

    reset();

    var tSinceLastFailure = userData.tSinceBeginning - userData.tLastTimeBelowThreshold;


 // Make Signal 1 occupy the largest contiguous interference-free sub-band
    // freq1 and freq2 are in Hz
    // freq2 and bw2 are assumed to be known
    var mid_freq = freq_min1 + (freq_max1 - freq_min1)/2.0;
	
    if(freq2 > mid_freq) {
        freq1 = (freq2 - (bw2)/2.0 + freq_min1)/2.0;
        bw1 = 5;
    } else {
        freq1 = (freq2 + (bw2)/2.0 + freq_max1)/2.0;
        bw1 = 5;
    };

    userData.lastdBits = dBits;
    return { freq1: freq1, gn1: -20, mcs1: 8};
