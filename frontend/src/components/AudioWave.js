import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";

const AudioWaveform = ({ fileUrl,setTime }) => {
  const waveformRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "hsl(51.24, 100%, 63.73%)",
      progressColor: "hsl(51.24, 100%, 40%)",
      cursorColor: "hsl(51.24, 100%, 40%)",
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      height: 100,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true,
        }),
      ],
    });

    waveform.load(fileUrl);

    const timer = waveformRef.current.appendChild(
      document.createElement("div")
    );
    timer.className = "timer";
    timer.textContent = "00:00";
    timerRef.current = timer;

    const regionStartTime = waveformRef.current.appendChild(
      document.createElement("div")
    );
    regionStartTime.className = "region-start-time";

    const regionEndTime = waveformRef.current.appendChild(
      document.createElement("div")
    );
    regionEndTime.className = "region-end-time";
    regionStartTime.textContent = `Start Time: 0 s`;
    waveform.on("ready", () => {
        // Update end time with duration of audio
        regionEndTime.textContent = `End Time: ${waveform
          .getDuration()
          .toFixed(2)} s`;
          setTime([0,parseFloat(waveform.getDuration().toFixed(2))]);
      });

      const playPauseButton = waveformRef.current.appendChild(
      document.createElement("button")
    );
    playPauseButton.setAttribute("type", "button");
    playPauseButton.className = "play-pause-button recording-btn";
    playPauseButton.textContent = "Play";
    playPauseButton.addEventListener("click", () => {
      if (waveform.isPlaying()) {
        waveform.pause();
      } else {
        const selectedRegion =
          waveform.regions.list[Object.keys(waveform.regions.list)[0]];
        if (selectedRegion) {
          const start = selectedRegion.start;
          const end = selectedRegion.end;
          waveform.play(start, end);
        } else {
          waveform.play();
        }
      }
    });

    waveform.on("region-update-end", (region) => {
      const start = region.start.toFixed(2);
      const end = region.end.toFixed(2);
      regionStartTime.textContent = `Start Time: ${start} s`;
      regionEndTime.textContent = `End Time: ${end} s`;
        setTime([parseFloat(start),parseFloat(end)]);
      region.on("click", () => {
        waveform.clearRegions();
        region.update({ color: "hsla(246, 100%, 50%, 0.4)" });
        regionStartTime.textContent = `Start Time: 0 s`;
        regionEndTime.textContent = `End Time: ${waveform
          .getDuration()
          .toFixed(2)} s`;
            setTime([0,parseFloat(waveform.getDuration().toFixed(2))]);
      });
    });

    waveform.on("finish", () => {
      playPauseButton.textContent = "Play";
    });

    waveform.on("pause", () => {
      playPauseButton.textContent = "Play";
    });
    waveform.on("play", () => {
      playPauseButton.textContent = "Pause";
    });
    waveform.on("audioprocess", () => {
      const currentTime = waveform.getCurrentTime();
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60)
        .toString()
        .padStart(2, "0");
      timerRef.current.textContent = `${minutes}:${seconds}`;
    });

    return () => {
      waveform.destroy();
      timerRef.current.remove();
      playPauseButton.remove();
      waveformRef.current.innerHTML = "";
    };
  }, [fileUrl]);

  return (
    <>
      <div ref={waveformRef} style={{'margin-top':'1rem'}}></div>
    </>
  );
};

export default AudioWaveform;
