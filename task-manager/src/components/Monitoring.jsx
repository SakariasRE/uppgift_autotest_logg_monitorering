function Monitoring({
    createdCount,
    errorCount,
    simulateError,
    setSimulateError
}) {
    return (
        <section className="card">
            <h2>▥ Monitorering</h2>

            <div className="monitor-stats">
                <div className="monitor-box created-box">
                    <p>Skapade uppgifter</p>
                    <h3>{createdCount}</h3>
                </div>

                <div className="monitor-box error-box">
                    <p>Registrerade fel</p>
                    <h3>{errorCount}</h3>
                </div>
            </div>

            <div className="error-toggle">
                <label htmlFor="simulate-error">Simulera fel</label>

                <input
                    id="simulate-error"
                    type="checkbox"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                />
            </div>

            {simulateError && (
                <p className="warning">
                    Fel är aktiverat. Nya uppgifter kan inte sparas.
                </p>
            )}
        </section>
    )
}

export default Monitoring
