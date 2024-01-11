
'''
Run inference via the Text-to-Audio (TTA) pipeline. 
You can infer the MusicGen model via the TTA pipeline in just a few lines of code!
'''

from transformers import pipeline
import scipy

synthesiser = pipeline("text-to-audio", "facebook/musicgen-small")

music = synthesiser("lo-fi music with a soothing melody", forward_params={"do_sample": True})

scipy.io.wavfile.write("musicgen_out.wav", rate=music["sampling_rate"], data=music["audio"])




'''
Run inference via the Transformers modelling code. 
You can use the processor + generate code to convert text 
into a mono 32 kHz audio waveform for more fine-grained control.
'''

from transformers import AutoProcessor, MusicgenForConditionalGeneration

processor = AutoProcessor.from_pretrained("facebook/musicgen-large")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-large")

inputs = processor(
    text=["80s pop track with bassy drums and synth", "90s rock song with loud guitars and heavy drums"],
    padding=True,
    return_tensors="pt",
)

audio_values = model.generate(**inputs, max_new_tokens=256)




'''

Listen to the audio samples either in an ipynb notebook:
    
'''
from IPython.display import Audio

sampling_rate = model.config.audio_encoder.sampling_rate
Audio(audio_values[0].numpy(), rate=sampling_rate)






'''

Or save them as a .wav file using a third-party library, e.g. scipy:
    
'''

import scipy

sampling_rate = model.config.audio_encoder.sampling_rate
scipy.io.wavfile.write("musicgen_out.wav", rate=sampling_rate, data=audio_values[0, 0].numpy())
