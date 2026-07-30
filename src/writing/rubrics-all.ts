/**
 * Import this module to ensure all exam rubrics are registered.
 *
 * Each exam rubric module calls registerRubrics() on import, so
 * importing this file is enough to make all rubrics available
 * via getRubric() / listRubrics().
 */

// Side-effect imports — each module registers its rubrics.
import './rubrics-ielts'
import './rubrics-pte'
import './rubrics-oet'
