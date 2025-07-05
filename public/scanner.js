document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-scanner');
    const stopBtn = document.getElementById('stop-scanner');
    const barcodeInput = document.getElementById('barcode-input');
    
    let scannerActive = false;
    
    startBtn.addEventListener('click', startScanner);
    stopBtn.addEventListener('click', stopScanner);
    
    function startScanner() {
        if (scannerActive) return;
        
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner'),
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader"]
            },
        }, function(err) {
            if (err) {
                console.error(err);
                alert("Failed to initialize scanner: " + err);
                return;
            }
            console.log("Scanner initialized");
            Quagga.start();
            scannerActive = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
        });
        
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            barcodeInput.value = code;
            stopScanner();
            document.getElementById('submit-attendance').click();
        });
    }
    
    function stopScanner() {
        if (!scannerActive) return;
        
        Quagga.stop();
        scannerActive = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});
