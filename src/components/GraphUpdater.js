import React, { useEffect, useRef, useState } from "react";
import { GraphGenerator } from "./GraphGenerator";
import styles from "./GraphGenerator.module.css";
import * as d3 from "d3";

export function GraphUpdater() {
    const containerRef = useRef(null);
    const textAreaRef = useRef(null);
    const [data, setData] = useState();

    useEffect(() => {
        if (containerRef.current) {
            GraphGenerator(containerRef.current, data.edges, data.vertices);
        }
    }, [data]);

    const setVisualizationData = () => {
        var rawData = JSON.parse(JSON.stringify(textAreaRef.current.value));
        let formattedData = {
            vertices: [],
            edges: []
        };
        var data = JSON.parse(rawData)
        if (data.vertices.length > 0) {
            formattedData.edges = data.edges.map(edge => {
                const { target_id, source_id, ...rest } = edge;
                return { ...rest, target: target_id, source: source_id }
            })
            formattedData.vertices = data.vertices;
        }
        d3.select("svg").remove();
        setData(formattedData);
    }

    return <div style={{ display: "flex" }}>
        <div className={styles.jsonInput}>
            <button onClick={setVisualizationData}>Generate Visualization</button>
            <textarea ref={textAreaRef} className={styles.rawInput} placeholder="PLease enter a valid JSON for visualization" />
        </div>
        {data && <div ref={containerRef} className={styles.container} />}
    </div>;
}
