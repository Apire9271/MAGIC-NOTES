import wave
import math
import struct

def create_dummy_wav(filename="test_audio.wav", duration=1.0):
    sample_rate = 44100
    n_frames = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as obj:
        obj.setnchannels(1)  # mono
        obj.setsampwidth(2)  # 2 bytes per sample
        obj.setframerate(sample_rate)
        
        # Generate silence or simple tone
        data = []
        for i in range(n_frames):
            value = int(32767.0 * math.sin(2 * math.pi * 440 * i / sample_rate))
            data.append(struct.pack('<h', value))
            
        obj.writeframes(b''.join(data))
    print(f"Created {filename}")

if __name__ == "__main__":
    create_dummy_wav()
