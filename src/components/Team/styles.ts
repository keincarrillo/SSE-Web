const ANIM_STYLES = `
  @keyframes teamFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes teamFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes teamSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes teamSlideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes teamScaleIn {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes teamSlideFromLeft {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .team-fade-up        { animation: teamFadeUp        0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-fade-in        { animation: teamFadeIn        0.55s ease both; }
  .team-slide-left     { animation: teamSlideLeft     0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-slide-right    { animation: teamSlideRight    0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-scale-in       { animation: teamScaleIn       0.7s  cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-slide-from-left{ animation: teamSlideFromLeft 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }

  .team-hidden {
    opacity: 0;
    transform: translateX(-48px);
  }

  @keyframes lineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  .team-line-grow {
    animation: lineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
    transform-origin: left center;
  }

  .doctor-card-sm {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .doctor-card-sm:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(212,175,55,0.18);
  }

  @keyframes descSlideDown {
    from { opacity: 0; transform: translateY(-8px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0);    max-height: 200px; }
  }
  @keyframes descSlideUp {
    from { opacity: 1; transform: translateY(0);    max-height: 200px; }
    to   { opacity: 0; transform: translateY(-8px); max-height: 0; }
  }

  .desc-open {
    animation: descSlideDown 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
    overflow: hidden;
  }
  .desc-close {
    animation: descSlideUp 0.28s cubic-bezier(0.55, 0, 1, 0.45) both;
    overflow: hidden;
  }

  .toggle-btn {
    transition: background 0.2s, border-color 0.2s;
  }
  .toggle-btn:hover {
    background: rgba(212,175,55,0.15);
    border-color: rgba(212,175,55,0.7);
  }

  @keyframes chevronRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(180deg); }
  }
  @keyframes chevronRotateBack {
    from { transform: rotate(180deg); }
    to   { transform: rotate(0deg); }
  }
  .chevron-open  { animation: chevronRotate     0.3s ease both; }
  .chevron-close { animation: chevronRotateBack 0.3s ease both; }
`

export function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('team-anim-styles')) return
  const el = document.createElement('style')
  el.id = 'team-anim-styles'
  el.textContent = ANIM_STYLES
  document.head.appendChild(el)
}
