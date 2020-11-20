import L from 'leaflet';

const strangerMarker = new L.Icon({
    iconUrl: require('./map-marker2.png'),
    // shadowUrl: null,
    iconSize: [30, 30],
    // shadowSize: null,
    iconAnchor: [15, 30],
    // shadowAnchor: null,
    popupAnchor: [0, -35],
    className: 'stranger-marker'
});

export default strangerMarker;